import dbConnect from '../../../../lib/db'
import Admin from '../../../../models/Admin'
import { generateToken, setAuthCookie } from '../../../../utils/jwt'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        })
    }

    try {
        await dbConnect()

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            })
        }

        // Find admin
        const admin = await Admin.findOne({ email: email.toLowerCase() })

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            })
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, admin.password)

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            })
        }

        // Generate JWT
        const token = generateToken({
            id: admin._id,
            email: admin.email,
            role: admin.role
        })

        // Set HttpOnly cookie
        setAuthCookie(res, token)

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            admin: {
                email: admin.email,
                role: admin.role
            }
        })
    } catch (error) {
        console.error('Admin Login Error:', error)
        return res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message
        })
    }
}
