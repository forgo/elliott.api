import { Application } from "oak/mod.ts";

const port = 8080;

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

console.log('running on port ', port);

await app.listen({ port });