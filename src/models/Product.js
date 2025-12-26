import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    category: {
        type: String,
        default: 'hoodie'
    },
    colors: [{
        name: String,
        value: String
    }],
    sizes: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

ProductSchema.pre('save', function (next) {
    this.updatedAt = Date.now()
    next()
})

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
