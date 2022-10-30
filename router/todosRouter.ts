import { Router } from "express";
import { addTodo, deleteTodoById, getAllTodos, getTodoById, updateTodoById } from "../controller/todoController";

const todoRouter = Router()

todoRouter.route('/').post(addTodo).get(getAllTodos)
todoRouter.route('/:id').get(getTodoById).delete(deleteTodoById).put(updateTodoById)

export default todoRouter