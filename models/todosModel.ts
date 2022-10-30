import { model, Schema } from "mongoose";

export interface TodoSchema {
  title: string,
  isComplete: boolean
}

const todoSchema = new Schema<TodoSchema>({
  title: String,
  isComplete: Boolean
}, { timestamps: true })

const Todo = model<TodoSchema>('Todo', todoSchema);

export default Todo