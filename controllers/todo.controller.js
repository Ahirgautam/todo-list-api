import todoService from "../services/todo.service.js"

const setTodo = async (req, res) => {
    try {

        const newTodo = await todoService.setTodo(req.body.title, req.body.description)
        res.status(201).json({
            success: true,
            message: 'Todo Added Successfully',
            todo: newTodo
        })
    }
    catch (err) {

        res.status(err.status || 500).json({
            success: false,
            message: err.message || 'Internal Sever Error'
        })
    }
}

const updateTodo = async (req, res) => {
    try {

        const newTodo = await todoService.updateTodo(req.params.id, req.body.title, req.body.description, req.body.status)
        res.status(200).json({
            success: true,
            message: 'Todo Added Successfully',
            todo: newTodo
        })
    }
    catch (err) {

        res.status(err.status || 500).json({
            success: false,
            message: err.message || 'Internal Sever Error'
        })
    }
}

const deleteTodo = async (req, res) => {
    try {

        await todoService.deleteTodo(req.params.id)
        res.status(204).json({
            success: true,
            message: 'Todo Deleted Successfully'
        })
    }
    catch (err) {

        res.status(err.status || 500).json({
            success: false,
            message: err.message || 'Internal Sever Error'
        })
    }
}
const getAllTodos = async (req, res) => {
    try {
        const { page, limit, status, sort } = req.query;

        const todos = await todoService.getAllTodos(page, limit, status, sort)
        res.status(200).json({
            success: true,
            data: {
                todos,
                page,
                limit,
                total: todos.length
            }
        })
    }
    catch (err) {
        res.status(err.status || 500).json({
            success: false,
            message: err.message || 'Internal Sever Error'
        })
    }
}
const getTodo = async (req, res) => {
    try {
        const todo = await todoService.getTodo(req.params.id)
        res.status(200).json({
            success: true,
            todo,
        })
    }
    catch (err) {
        res.status(err.status || 500).json({
            success: false,
            message: err.message || 'Internal Sever Error'
        })
    }
}

export default {
    setTodo,
    getTodo,
    getAllTodos,
    updateTodo,
    deleteTodo
}