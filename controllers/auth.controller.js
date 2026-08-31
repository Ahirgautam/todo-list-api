import authService from "../services/auth.service.js"
import jwt from "jsonwebtoken"
import { generateToken } from "../utils/jwt.util.js";
import { verifyToken } from "../utils/jwt.util.js";
import { token } from "morgan";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await authService.register(name, email, password)

        const access_token = generateToken(newUser.id, newUser.email)
        const refresh_token = generateToken(newUser.id, newUser.email, "7d", true)
        res.cookie("refreshToken", refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "strict",
            path: "/api/auth"
        })

        res.status(201).json({ success: true, message: "User Registered", token: "hii" })
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message || "Internal Server Error" })
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await authService.login(email, password)

        const access_token = generateToken(user.id, user.email)
        const refresh_token = generateToken(user.id, user.email, "7d", true)
        res.cookie("refreshToken", refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "strict",
            path: "/api/auth"
        })
        res.json({ success: true, message: "login successful", access_token })
    }
    catch (err) {
        res.status(401).json({ success: false, message: err.message || "Authentication failed" })
    }
}
const logoutUser = async (req, res) => {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/api/auth"
        });

        res.json({
            message: "Logged out successfully"
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const refreshToken = async (req, res) => {
    try {
        const refresh_token = req.cookies.refreshToken;
        if (!refresh_token) {
            throw new Error({ message: "Refresh Token not found!" })
        }
        const user = verifyToken(refresh_token, true)
        if (!user) {
            throw new Error("No Data Found!")
        }
        const access_token = generateToken(user.id, user.email)
        res.json({ access_token })
    }
    catch (err) {
        res.status(500).json({ message: err.message || "Internal server error" })
    }
}

export default {
    registerUser,
    loginUser,
    logoutUser,
    refreshToken
}