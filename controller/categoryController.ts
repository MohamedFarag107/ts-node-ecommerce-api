import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { Types } from "mongoose";
import slugify from "slugify";
import Category from "../models/categoryModel";

// @description: Create Category
// @route: POST => /api/v1/categories
// @access: Private
interface IBody {
  name: string;
}

export const createCategory = expressAsyncHandler(
  async (req: Request<{}, {}, IBody, {}>, res: Response): Promise<void> => {
    const name: string = req.body.name;
    const document = await Category.create({ name, slug: slugify(name) });
    // 201 => for create
    res.status(201).json({
      data: document,
    });
  }
);

// @description: Get All Categories
// @route: GET => /api/v1/categories?page=<number>&limit=<number>
// @access: Public
interface IQuery {
  page: number;
  limit: number;
}
export const getAllCategories = expressAsyncHandler(
  async (req: Request<{}, {}, {}, IQuery>, res: Response): Promise<void> => {
    const { page = 1, limit = 5 } = req.query;
    const skip: number = (page - 1) * limit;
    const documents = await Category.find({}).skip(skip).limit(limit);
    // 200 by default
    res.json({
      result: documents.length,
      page,
      data: documents,
    });
  }
);

// @description: Get Specific Category
// @route: GET => /api/v1/categories/:id
// @access: Public
interface IParams {
  id: Types.ObjectId;
}

export const getSpecificCategory = expressAsyncHandler(
  async (req: Request<IParams, {}, {}, {}>, res: Response,next:NextFunction): Promise<void> => {
    // const id: Types.ObjectId = req.params.id;
    const id: Types.ObjectId = req.params.id;
    const document = await Category.findById(id);
    if (!document) {
      res.status(404).json({
        data: "No Category For this id " + id,
      });
      // next()
    }
    res.json({
      data: document,
    });
  }
);

// @description: Update Specific Category
// @route: PUT => /api/v1/categories/:id
// @access: Private

export const updateSpecificCategory = expressAsyncHandler(
  async (
    req: Request<IParams, {}, IBody, {}>,
    res: Response
  ): Promise<void> => {
    const name: string = req.body.name;
    const id: Types.ObjectId = req.params.id;

    const document = await Category.findOneAndUpdate(
      { _id: id },
      {
        name,
        slug: slugify(name),
      },
      {
        new: true,
      }
    );
    if (!document) {
      res.status(404).json({
        data: `No Category For this id <${id}>`,
      });
    }
    res.json({
      data: document,
    });
  }
);

// @description: Delete Specific Category
// @route: DELETE => /api/v1/categories/:id
// @access: Private

export const deleteSpecificCategory = expressAsyncHandler(
  async (req: Request<IParams, {}, {}, {}>, res: Response): Promise<void> => {
    const id: Types.ObjectId = req.params.id;
    const document = await Category.findByIdAndDelete(id);
    if (!document) {
      res.status(404).json({
        data: `No Category For this id <${id}>`,
      });
    }
    // code for delete
    res.status(204).send();
  }
);
