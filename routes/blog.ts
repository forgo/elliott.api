import { Router } from "oak/mod.ts";

const router = new Router();
// controller
import blogController from "../controllers/blog.ts";

router
  .get("/blogs", blogController.getAll)
  .post("/blogs", blogController.create);
// .get("/blogs/:id", blogController.getBlogById)
// .put("/blogs/:id", blogController.updateBlogById)
// .delete("/blogs/:id", blogController.deleteBlogById);

export default router;
