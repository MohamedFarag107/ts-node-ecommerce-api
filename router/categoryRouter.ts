import { Router } from "express";
import {
  createCategory,
  deleteSpecificCategory,
  getAllCategories,
  getSpecificCategory,
  updateSpecificCategory,
} from "../controller/categoryController";

const categoryRouter = Router();

categoryRouter.route("/").post(createCategory).get(getAllCategories);
categoryRouter
  .route("/:id")
  .get(getSpecificCategory)
  .put(updateSpecificCategory)
  .delete(deleteSpecificCategory);

export default categoryRouter;
