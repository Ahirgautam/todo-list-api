import { verifyToken } from "../utils/jwt.util.js";

const authenticateUser = (req, res, next) => {

    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1]
    if (!token || !(req.user = verifyToken(token))) {

        return res.status(401).json({ message: "Unauthorized" })
    }

    return next()
}

export default authenticateUser