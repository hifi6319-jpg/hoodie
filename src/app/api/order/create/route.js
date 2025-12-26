import dbConnect from '@/lib/db'
import Order from '@/models/Order'
import Product from '@/models/Product'
import { validateOrderData, sanitizeInput } from '@/utils/validation'
import Razorpay from 'razorpay'

export const dynamic = 'force-dynamic'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        })
    }

    // Initialize Razorpay conditionally inside handler
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID || 'dummy_id',
        key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret'
    })

    try {
        await dbConnect()

        // Validate input
        const errors = validateOrderData(req.body)
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            })
        }

        // Sanitize customer data
        const customerData = {
            name: sanitizeInput(req.body.customer.name),
            email: sanitizeInput(req.body.customer.email),
            phone: sanitizeInput(req.body.customer.phone),
            address: req.body.customer.address ? {
                line1: sanitizeInput(req.body.customer.address.line1 || ''),
                line2: sanitizeInput(req.body.customer.address.line2 || ''),
                city: sanitizeInput(req.body.customer.address.city || ''),
                state: sanitizeInput(req.body.customer.address.state || ''),
                pincode: sanitizeInput(req.body.customer.address.pincode || ''),
                country: 'India'
            } : {}
        }

        // Fetch product and verify stock
        const product = await Product.findById(req.body.items[0].product)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }

        const requestedQuantity = req.body.items[0].quantity

        if (product.stock < requestedQuantity) {
            return res.status(400).json({
                success: false,
                message: `Insufficient stock. Only ${product.stock} items available`
            })
        }

        // Calculate total with 40% discount for quantity >= 2
        const hasDiscount = requestedQuantity >= 2
        const unitPrice = hasDiscount ? product.price * 0.6 : product.price
        const totalAmount = Math.round(unitPrice * requestedQuantity * 100) / 100

        // Generate unique order ID
        const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

        // Create Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: totalAmount * 100, // Convert to paise
            currency: 'INR',
            receipt: orderId,
            notes: {
                customer_email: customerData.email,
                customer_name: customerData.name
            }
        })

        // Create order in database
        const order = new Order({
            orderId,
            customer: customerData,
            items: [{
                product: product._id,
                quantity: requestedQuantity,
                size: req.body.items[0].size,
                color: req.body.items[0].color,
                price: unitPrice
            }],
            totalAmount,
            paymentStatus: 'pending',
            paymentMethod: 'razorpay',
            orderStatus: 'pending'
        })

        await order.save()

        return res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order: {
                orderId: order.orderId,
                totalAmount: order.totalAmount,
                paymentStatus: order.paymentStatus
            },
            razorpayOrder: {
                id: razorpayOrder.id,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                key: process.env.RAZORPAY_KEY_ID
            }
        })
    } catch (error) {
        console.error('Order API Error:', error)
        return res.status(500).json({
            success: false,
            message: 'Failed to create order',
            error: error.message
        })
    }
}
