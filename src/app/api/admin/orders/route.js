import dbConnect from '../../../../../lib/db'
import Order from '../../../../../models/Order'
import { authenticateAdmin } from '../../../../../utils/authMiddleware'

async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        })
    }

    try {
        await dbConnect()

        const { page = 1, limit = 20, status, paymentStatus } = req.query

        const query = {}
        if (status) query.orderStatus = status
        if (paymentStatus) query.paymentStatus = paymentStatus

        const orders = await Order.find(query)
            .populate('items.product', 'name image')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .select('-__v')

        const totalOrders = await Order.countDocuments(query)

        return res.status(200).json({
            success: true,
            orders,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: totalOrders,
                pages: Math.ceil(totalOrders / parseInt(limit))
            }
        })
    } catch (error) {
        console.error('Fetch Orders Error:', error)
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch orders',
            error: error.message
        })
    }
}

export default authenticateAdmin(handler)
