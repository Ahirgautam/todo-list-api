import Users from "../models/Users.js"
import bcrypt from "bcrypt"

const register = async (name, email, password) => {
    try {
        const existingUser = await Users.findOne({
            where: {
                email
            }
        })
        if (existingUser) {
            throw new Error("User with email already exists!")
        }
        return (await Users.create({
            name, email, password: await bcrypt.hash(password, 10)
        })).dataValues

    }
    catch (err) {
        throw new Error(err.message)
    }
}
const login = async (email, password) => {
    try {
        const existingUser = await Users.findOne({
            where: { email }
        })
        if (!existingUser) {
            throw new Error("No User Found With Email")
        }
        const match = await bcrypt.compare(password, existingUser.password)
        if (!match) {
            throw new Error("Invalid credentials")
        }
        return existingUser.dataValues
    }
    catch (err) {
        throw new Error(err.message || "failed to login")
    }
}
const logout = async (req, res) => {
    try {

    }
    catch (err) {

    }
}

export default {
    register,
    login,
    logout
}