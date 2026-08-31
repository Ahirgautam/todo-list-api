import express from "express"
import todoController from "../controllers/todo.controller.js"
import authenticateUser from "../middlewares/authenticate.js"
import validateSchema from "../middlewares/validate.js"
import { todoSchema } from "../validators/todo.validator.js"

const router = express.Router()

router.post("/", validateSchema(todoSchema), authenticateUser, todoController.setTodo)
router.get("/", authenticateUser, todoController.getAllTodos)
router.get("/:id", authenticateUser, todoController.getTodo)
router.put("/:id", authenticateUser, todoController.updateTodo)
router.delete("/:id", authenticateUser, todoController.deleteTodo)

export { router as todoRouter }