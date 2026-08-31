import express from "express"
import authController from "../controllers/auth.controller.js"
import validateSchema from "../middlewares/validate.js"
import { loginSchema, registerSchema } from "../validators/auth.validator.js"
import authenticateUser from "../middlewares/authenticate.js"

const router = express.Router()

router.post("/register", validateSchema(registerSchema), authController.registerUser)
router.post("/login", validateSchema(loginSchema), authController.loginUser)
router.post("/logout", authenticateUser, authController.logoutUser)
router.post("/refresh", authController.refreshToken)

export { router as authRouter }