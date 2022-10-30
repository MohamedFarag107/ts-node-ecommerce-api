import { Request, Response } from "express";
import Todo, { TodoSchema } from "../models/todosModel";

export const addTodo = async (req: Request, res: Response) => {
  const todo: TodoSchema = req.body
  try {
    const document = await Todo.create(todo);
    document.save()
    res.json({
      status: true,
      data: document
    })
  } catch (error) {
    res.json({
      status: false,
      data: error
    })
  }
}
export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const document = await Todo.find()
    res.json({
      status: true,
      data: document
    })
  } catch (error) {
    res.json({
      status: false,
      data: error
    })
  }
}
export const getTodoById = async (req: Request, res: Response) => {
  const id: string = req.params.id
  try {
    const document = await Todo.findById(id)
    if (document) {
      res.json({
        status: true,
        data: document
      })
    } else {
      res.json({
        status: false,
        data: "not found " + id
      })
    }
  } catch (error) {
    res.json({
      status: false,
      data: error
    })
  }
}
export const deleteTodoById = async (req: Request, res: Response) => {
  const id: string = req.params.id
  try {
    const document = await Todo.findByIdAndRemove(id)
    if (document) {
      res.json({
        status: true,
        data: document
      })
    } else {
      res.json({
        status: false,
        data: "not found " + id
      })
    }

  } catch (error) {
    res.json({
      status: false,
      data: error
    })
  }
}

export const updateTodoById = async (req: Request, res: Response) => {
  const id: string = req.params.id
  const todo: TodoSchema = req.body
  try {
    const document = await Todo.findByIdAndUpdate(id, todo, {
      new: true,
    })
    if (document) {
      res.json({
        status: true,
        data: document
      })
    } else {
      res.json({
        status: false,
        data: "not found " + id
      })
    }
  } catch (error) {
    res.json({
      status: false,
      data: error
    })
  }
}