import dbConnect from '@/lib/db'
import Product from '@/models/Product'
import { authenticateAdmin } from '@/utils/authMiddleware'

export const dynamic = 'force-dynamic'

async function handler(req, res) {
    if (req.method !== 'PATCH') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        })
    }

    try {
        await dbConnect()

        const { price, stock, description } = req.body

        const updateData = {}
        if (price !== undefined && price >= 0) updateData.price = price
        if (stock !== undefined && stock >= 0) updateData.stock = stock
        if (description) updateData.description = description.trim()
        updateData.updatedAt = Date.now()

        if (Object.keys(updateData).length === 1) {
            return res.status(400).json({
                success: false,
                message: 'No valid fields to update'
            })
        }

        const product = await Product.findOneAndUpdate(
            {},
            updateData,
            { new: true }
        )

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product: {
                _id: product._id,
                name: product.name,
                price: product.price,
                stock: product.stock,
                description: product.description,
                updatedAt: product.updatedAt
            }
        })
    } catch (error) {
        console.error('Update Product Error:', error)
        return res.status(500).json({
            success: false,
            message: 'Failed to update product',
            error: error.message
        })
    }
}

export default authenticateAdmin(handler)
