import { model, Schema } from "mongoose";

export interface ICategory {
  name: string;
  slug: string;
  image?: string;
}
const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "category name required"],
      unique: true,
      minlength: [3, "too short (must be more than 3 characters)"],
      maxlength: [32, "too long (must be less than 32 characters)"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);
const Category = model("Category", categorySchema);
export default Category;
