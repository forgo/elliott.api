import { Middleware } from "oak/middleware.ts";
import { green, cyan, white, bgRed } from "std/fmt/colors.ts";

const X_RESPONSE_TIME = "X-Response-Time";

const logger: Middleware = async ({ response, request }, next) => {
  await next();
  const responseTime = response.headers.get(X_RESPONSE_TIME);
  console.log(
    `${green(request.method)} ${cyan(request.url.pathname)} ${response.status}`
  );
  console.log(`${bgRed(white(String(responseTime)))}`);
};

const responseTime: Middleware = async ({ response }, next) => {
  const start = Date.now();
  await next();
  const ms: number = Date.now() - start;
  response.headers.set(X_RESPONSE_TIME, `${ms}ms`);
};

export default {
  logger,
  responseTime,
};
