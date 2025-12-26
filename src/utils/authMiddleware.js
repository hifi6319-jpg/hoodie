import { verifyToken, getTokenFromCookie } from './jwt'

export const authenticateAdmin = (handler) => {
    return async (req, res) => {
        try {
            const token = getTokenFromCookie(req)

            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                })
            }

            const decoded = verifyToken(token)

            if (!decoded) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid or expired token'
                })
            }

            // Attach admin data to request
            req.admin = decoded

            return handler(req, res)
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Authentication error',
                error: error.message
            })
        }
    }
}
