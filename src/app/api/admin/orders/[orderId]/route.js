import dbConnect from '@/lib/db'
import Order from '@/models/Order'
import { authenticateAdmin } from '@/utils/authMiddleware'

export const dynamic = 'force-dynamic'

async function handler(req, res) {
    const { orderId } = req.query

    try {
        await dbConnect()

        if (req.method === 'GET') {
            const order = await Order.findOne({ orderId })
                .populate('items.product')
                .select('-__v')

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found'
                })
            }

            return res.status(200).json({
                success: true,
                order
            })
        }

        if (req.method === 'PATCH') {
            const { orderStatus } = req.body

            const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
            if (!orderStatus || !validStatuses.includes(orderStatus)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid order status',
                    validStatuses
                })
            }

            const order = await Order.findOneAndUpdate(
                { orderId },
                { orderStatus, updatedAt: Date.now() },
                { new: true }
            )

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found'
                })
            }

            return res.status(200).json({
                success: true,
                message: 'Order status updated',
                order
            })
        }

        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        })
    } catch (error) {
        console.error('Order API Error:', error)
        return res.status(500).json({
            success: false,
            message: 'Operation failed',
            error: error.message
        })
    }
}

export default authenticateAdmin(handler)
