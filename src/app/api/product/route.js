import dbConnect from '@/lib/db'
import Product from '@/models/Product'

export const dynamic = 'force-dynamic'

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        })
    }

    try {
        await dbConnect()

        const product = await Product.findOne().select('-__v')

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }

        return res.status(200).json({
            success: true,
            product: {
                _id: product._id,
                name: product.name,
                price: product.price,
                description: product.description,
                image: product.image,
                stock: product.stock,
                colors: product.colors,
                sizes: product.sizes,
                category: product.category
            }
        })
    } catch (error) {
        console.error('Product API Error:', error)
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch product',
            error: error.message
        })
    }
}
