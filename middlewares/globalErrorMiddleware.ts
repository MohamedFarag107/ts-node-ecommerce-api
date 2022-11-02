import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiError";

const globalError = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode || 404).json(errorMode(err));
};

const errorMode = (error: ApiError) => {
  const mode = process.env.NODE_ENV === "development";
  return mode
    ? {
        name: error.name || "Error",
        message: error.message || "no message",
        statusCode: error.statusCode || 404,
        stack: error.stack || "no stack",
      }
    : {
        name: error.name || "Error",
        message: error.message || "no message",
        statusCode: error.statusCode || 404,
      };
};

export default globalError;
