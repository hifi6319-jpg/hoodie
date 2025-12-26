import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    name: {
        type: String,
        maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    cart: {
        items: [{
            productId: String,
            quantity: Number,
            color: String
        }]
    }
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
