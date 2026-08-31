import Todo from "../models/Todo.js"

const setTodo = async (title, description) => {

    const todo = await Todo.create({
        title, description
    })
    return todo.dataValues

}
const getTodo = async (id) => {

    const todo = await Todo.findByPk(id);

    if (!todo) {
        const err = new Error("Todo not found");
        err.status = 404;
        throw err;
    }
    return todo
}

const getAllTodos = async (page = 1, limit = 10, status, sort) => {
    const l = parseInt(limit, 10) || 10
    const p = parseInt(page, 10) || 1
    const offset = (p - 1) * l

    const todo = await Todo.findAll({
        where: { status: status || true },
        order: sort ? [['createdAt', sort]] : [['createdAt', 'DESC']],
        limit: l,
        offset
    })

    if (!todo) {
        const err = new Error("Todo not found")
        err.status = 404
        throw err
    }
    return todo
}
const updateTodo = async (id, title, description, status) => {


    const todo = await Todo.findByPk(id);

    if (!todo) {
        const err = new Error("Todo not found");
        err.status = 404;
        throw err;
    }

    await todo.update({
        title,
        description,
        status
    });

    return todo;

}
const deleteTodo = async (id) => {
    const todo = await Todo.findByPk(id);

    if (!todo) {
        const err = new Error("Todo not found");
        err.status = 404;
        throw err;
    }

    await todo.destroy({
        id
    });


}

export default {
    setTodo,
    updateTodo,
    getTodo,
    getAllTodos,
    deleteTodo
}