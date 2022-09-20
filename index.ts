import { Application } from "oak/mod.ts";
import { green, yellow } from "std/fmt/colors.ts";

// routes
import logger from "./middleware/logger.ts";
import notFound from "./middleware/not-found.ts";
import blogRouter from "./routes/blog.ts";
import todoRouter from "./routes/todo.ts";

import { seedDatabase } from "./neo4j/actions/seed-db.ts";

await seedDatabase();

const app = new Application();
const port = 8080;

// order of execution is important;
app.use(logger.logger);
app.use(logger.responseTime);
app.use(todoRouter.routes());
app.use(todoRouter.allowedMethods());

app.use(blogRouter.routes());
app.use(blogRouter.allowedMethods());

// 404 page
app.use(notFound);

app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(`${yellow("Listening on:")} ${green(url)}`);
});

await app.listen({ port });
