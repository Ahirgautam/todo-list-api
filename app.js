import express from "express"

import sequelize from "./config/database.js"
import Todo from "./models/Todo.js"
import Users from "./models/Users.js"
import rateLimit from "express-rate-limit"
import { slowDown } from "express-slow-down"

import { authRouter } from "./routes/auth.route.js"
import { todoRouter } from "./routes/todo.route.js"

import morgan from "morgan"
import cookieParser from "cookie-parser"
import { success } from "zod"

try {
    sequelize.authenticate()
    await sequelize.sync()
    console.log("Database connected")
}
catch (err) {
    console.log("Error connecting database")
}
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: "Too many requests from this IP, please try again after 15 minutes"
    },
    standardHeaders: true,
    legacyHeaders: false
})

const speedLimiter = slowDown({
    windowMs: 60 * 1000,
    delayAfter: 5,
    delayMs: (hits) => hits * 100
})


const app = express()
app.use(limiter)
app.use("/api", speedLimiter)
app.use(cookieParser())
app.use(express.json())
app.use(morgan("dev"))

app.use("/api/auth", authRouter)
app.use("/api/todos", todoRouter)

app.use((req, res, next) => {
    const error = new Error('Route Not Found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});


export default app
