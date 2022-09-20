import { Middleware } from "oak/middleware.ts";
import ApiErrorType from "../errors/ApiErrorType.ts";

const notFound: Middleware = ({ response }) => {
  response.status = 404;
  response.body = {
    success: false,
    errors: {
      [ApiErrorType.NOT_FOUND]: {
        message: "404 - Not found.",
      },
    },
  };
};

export default notFound;
