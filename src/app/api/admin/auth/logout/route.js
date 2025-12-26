import { clearAuthCookie } from '@/utils/jwt'

export const dynamic = 'force-dynamic'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        })
    }

    try {
        clearAuthCookie(res)

        return res.status(200).json({
            success: true,
            message: 'Logout successful'
        })
    } catch (error) {
        console.error('Admin Logout Error:', error)
        return res.status(500).json({
            success: false,
            message: 'Logout failed',
            error: error.message
        })
    }
}
