import { Request } from "oak/request.ts";
import ApiError from "../errors/ApiError.ts";
import ApiErrorType from "../errors/ApiErrorType.ts";
import type { Blog, Response } from "../interfaces/index.ts";
import { createBlog, getAllBlogs } from "../neo4j/queries/blog.ts";

// HTTP 200
const ok = <T>(response: Response<T>, data: T) => {
  response.status = 200;
  response.body = {
    success: true,
    data,
  };
};

// HTTP 201
const created = <T>(response: Response<T>, data: T) => {
  response.status = 201;
  response.body = {
    success: true,
    data,
  };
};

// HTTP 400
const badRequest = <T>(
  response: Response<T>,
  message: string,
  error?: Error
) => {
  response.status = 400;
  response.body = {
    success: false,
    errors: {
      [ApiErrorType.BAD_REQUEST]: {
        message,
        error,
      },
    },
  };
};

// HTTP 500
const internalServerError = <T>(
  response: Response<T>,
  message: string,
  error?: Error
) => {
  response.status = 500;
  response.body = {
    success: false,
    errors: {
      [ApiErrorType.INTERNAL_SERVER_ERROR]: {
        error,
        message,
      },
    },
  };
};

export default {
  /**
   * @description Get all blogs
   * @route GET /blogs
   */
  getAll: async ({ response }: { response: Response<Array<Blog>> }) => {
    let blogs: Array<Blog> = [];
    try {
      blogs = await getAllBlogs();
    } catch (error) {
      internalServerError(response, error);
      return;
    }
    ok(response, blogs);
  },
  /**
   * @description Create a new blog
   * @route POST /blogs
   */
  create: async ({
    request,
    response,
  }: {
    request: Request;
    response: Response<Blog>;
  }) => {
    let blog: Blog;

    try {
      blog = await request.body({ type: "json" }).value;
    } catch (error) {
      badRequest(response, "Unparsable JSON", error);
      return;
    }

    if (!request.hasBody) {
      badRequest(response, "No data provided");
      return;
    }

    try {
      await createBlog();
    } catch (error) {
      internalServerError(response, "Failed to create blog", error);
      return;
    }

    created(response, blog);
  },
  /**
   * @description Get blog by id
   * @route GET blogs/:id
   */
  //   getBlogById: ({
  //     params,
  //     response,
  //   }: {
  //     params: { id: string };
  //     response: Response<Instance<Blog>>;
  //   }) => {
  //     const todo: Instance<Blog> | undefined = [].find((t) => {
  //       return t.id === params.id;
  //     });
  //     if (!todo) {
  //       response.status = 404;
  //       response.body = {
  //         success: false,
  //         errors: {
  //           [ErrorCode.NOT_FOUND]: {
  //             message: `Todo with id=${params.id} does not exist`,
  //           },
  //         },
  //       };
  //       return;
  //     }

  //     // If todo is found
  //     response.status = 200;
  //     response.body = {
  //       success: true,
  //       data: todo,
  //     };
  //   },
  //   /**
  //    * @description Update todo by id
  //    * @route PUT todos/:id
  //    */
  //   updateTodoById: async ({
  //     params,
  //     request,
  //     response,
  //   }: {
  //     params: { id: string };
  //     request: Request;
  //     response: Response<Instance<Todo>>;
  //   }) => {
  //     const todo: Instance<Todo> | undefined = todos.find(
  //       (t) => t.id === params.id
  //     );
  //     if (!todo) {
  //       response.status = 404;
  //       response.body = {
  //         success: false,
  //         errors: {
  //           [ErrorCode.NOT_FOUND]: {
  //             message: `Todo with id=${params.id} does not exist`,
  //           },
  //         },
  //       };
  //       return;
  //     }

  //     // if todo found then update todo
  //     let newTodo: Todo;

  //     try {
  //       newTodo = await request.body({ type: "json" }).value;
  //     } catch (error) {
  //       response.status = 400;
  //       response.body = {
  //         success: false,
  //         errors: {
  //           [ErrorCode.BAD_REQUEST]: {
  //             message: "Unparsable JSON",
  //             error,
  //           },
  //         },
  //       };
  //       return;
  //     }

  //     if ("id" in newTodo) {
  //       response.status = 400;
  //       response.body = {
  //         success: false,
  //         errors: {
  //           [ErrorCode.BAD_REQUEST]: {
  //             message: "id cannot be updated",
  //           },
  //         },
  //       };
  //       return;
  //     }

  //     const { title, isCompleted } = newTodo;
  //     if (!title) {
  //       response.status = 400;
  //       response.body = {
  //         success: false,
  //         errors: {
  //           [ErrorCode.BAD_REQUEST]: {
  //             message: "title is required",
  //           },
  //         },
  //       };
  //       return;
  //     }

  //     const updatedTodo: Instance<Todo> = {
  //       id: todo.id,
  //       title,
  //       isCompleted: isCompleted ?? false,
  //     };

  //     response.status = 200;
  //     response.body = {
  //       success: true,
  //       data: updatedTodo,
  //     };
  //   },
  //   /**
  //    * @description Delete todo by id
  //    * @route DELETE todos/:id
  //    */
  //   deleteTodoById: ({
  //     params,
  //     response,
  //   }: {
  //     params: { id: string };
  //     response: Response<Instance<Todo>>;
  //   }) => {
  //     const todo: Instance<Todo> | undefined = todos.find((t) => {
  //       return t.id === params.id;
  //     });

  //     if (!todo) {
  //       response.status = 404;
  //       response.body = {
  //         success: false,
  //         errors: {
  //           [ErrorCode.NOT_FOUND]: {
  //             message: `Todo with id=${params.id} does not exist`,
  //           },
  //         },
  //       };
  //       return;
  //     }

  //     // const allTodos = todos.filter((t) => t.id !== params.id);

  //     // remove the todo w.r.t id and return
  //     // remaining todos
  //     response.status = 200;
  //     response.body = {
  //       success: true,
  //       data: todo,
  //     };
  //   },
};
