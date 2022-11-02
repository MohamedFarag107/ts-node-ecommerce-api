// declare module "name of module"
import express, { Request, Response, Application, NextFunction } from "express";
import connectToDB from "./config/dbConnection";
import categoryRouter from "./router/categoryRouter";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config({ path: "config.env" });

const app: Application = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`environment mode: ${process.env.NODE_ENV}`);
}
connectToDB();

app.use("/api/v1/categories", categoryRouter);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.json({
    error: err,
  });
});

const PORT: number = <number>(<unknown>process.env.PORT) || 4001;

app.listen(PORT, () => {
  console.log(`server start port: ${PORT}`);
});
