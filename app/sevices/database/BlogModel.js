import { Schema, model, models } from "mongoose";
const blogMoModel = new Schema(
  {
    slug: { type: String, require: true },
    title: { type: String, require: true },
    des: { type: String, require: true },
    image: { type: String, require: true },
    content: { type: String, require: true },
  },
  { timestamps: true }
);
const blogModel = models.Blog || model("Blog", blogMoModel);
export default blogModel;
