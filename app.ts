// declare module "name of module"
import express, { Request, Response, Application } from "express";
import connectToDB from "./config/dbConnection";
import todoRouter from "./router/todosRouter";

const app: Application = express();
app.use(express.json());

connectToDB()


app.use('/api/v1/todos', todoRouter)



const PORT: number = 4001;

app.listen(PORT, () => {
    console.log("server start");
});
