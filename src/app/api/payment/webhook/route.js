import dbConnect from '../../../../lib/db'
import Order from '../../../../models/Order'
import Product from '../../../../models/Product'
import crypto from 'crypto'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        })
    }

    try {
        await dbConnect()

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderId
        } = req.body

        // Verify Razorpay signature
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex')

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Invalid payment signature'
            })
        }

        // Find order
        const order = await Order.findOne({ orderId }).populate('items.product')

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            })
        }

        // Check if already processed
        if (order.paymentStatus === 'paid') {
            return res.status(200).json({
                success: true,
                message: 'Payment already processed',
                order: {
                    orderId: order.orderId,
                    paymentStatus: order.paymentStatus,
                    orderStatus: order.orderStatus
                }
            })
        }

        // Update order with payment details
        order.paymentStatus = 'paid'
        order.paymentId = razorpay_payment_id
        order.paymentSignature = razorpay_signature
        order.orderStatus = 'processing'

        // Reduce product stock
        for (const item of order.items) {
            const product = await Product.findById(item.product._id)
            if (product) {
                product.stock = Math.max(0, product.stock - item.quantity)
                await product.save()
            }
        }

        await order.save()

        return res.status(200).json({
            success: true,
            message: 'Payment verified and order confirmed',
            order: {
                orderId: order.orderId,
                paymentStatus: order.paymentStatus,
                orderStatus: order.orderStatus,
                totalAmount: order.totalAmount
            }
        })
    } catch (error) {
        console.error('Payment Webhook Error:', error)

        // Mark order as failed if it exists
        if (req.body.orderId) {
            try {
                await Order.findOneAndUpdate(
                    { orderId: req.body.orderId },
                    {
                        paymentStatus: 'failed',
                        orderStatus: 'pending'
                    }
                )
            } catch (updateError) {
                console.error('Failed to update order status:', updateError)
            }
        }

        return res.status(500).json({
            success: false,
            message: 'Payment verification failed',
            error: error.message
        })
    }
}
