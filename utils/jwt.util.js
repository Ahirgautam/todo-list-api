import jwt from "jsonwebtoken"

const generateToken = (id, email, expires_in = "15m", isRefreshToken = false) => {
    const payload = { id, email }

    const secret = isRefreshToken ? process.env.JWT_REFRESH_SECRET : process.env.JWT_ACCESS_SECRET;
    const token = jwt.sign(payload, secret, {
        expiresIn: expires_in || process.env.JWT_EXPIRE
    })

    return token
}
const verifyToken = (token, isRefreshToken = false) => {
    try {
        const secret = isRefreshToken ? process.env.JWT_REFRESH_SECRET : process.env.JWT_ACCESS_SECRET;
        return jwt.verify(token, secret)
    }
    catch (err) {
        return null
    }
}
export {
    generateToken,
    verifyToken
}