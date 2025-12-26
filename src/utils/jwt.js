import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET)
    } catch (error) {
        return null
    }
}

export const setAuthCookie = (res, token) => {
    res.setHeader('Set-Cookie', `admin_token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict; Secure=${process.env.NODE_ENV === 'production'}`)
}

export const clearAuthCookie = (res) => {
    res.setHeader('Set-Cookie', 'admin_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict')
}

export const getTokenFromCookie = (req) => {
    const cookies = req.headers.cookie
    if (!cookies) return null

    const tokenCookie = cookies.split(';').find(c => c.trim().startsWith('admin_token='))
    if (!tokenCookie) return null

    return tokenCookie.split('=')[1]
}
