import { Router } from "oak/mod.ts";

const router = new Router();
// controller
import blogController from "../controllers/blog.ts";

router.get("/blogs", blogController.getAll);
// TODO: lock down write operations in API using security!!!
// .post("/blogs", blogController.create);
// .get("/blogs/:id", blogController.getBlogById)
// .put("/blogs/:id", blogController.updateBlogById)
// .delete("/blogs/:id", blogController.deleteBlogById);

export default router;
