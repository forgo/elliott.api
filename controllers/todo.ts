import { Request } from "oak/request.ts";
import { v4 } from "std/uuid/mod.ts";
import ApiErrorType from "../errors/ApiErrorType.ts";
import type { Response, Todo } from "../interfaces/index.ts";
import { Instance } from "../interfaces/Instance.ts";

import todos from "../stubs/todos.ts";

export default {
  /**
   * @description Get all todos
   * @route GET /todos
   */
  getAllTodos: ({ response }: { response: Response<Array<Todo>> }) => {
    response.status = 200;
    response.body = {
      success: true,
      data: todos,
    };
  },
  /**
   * @description Add a new todo
   * @route POST /todos
   */
  createTodo: async ({
    request,
    response,
  }: {
    request: Request;
    response: Response<Todo>;
  }) => {
    let todo: Todo;

    try {
      todo = await request.body({ type: "json" }).value;
    } catch (error) {
      response.status = 400;
      response.body = {
        success: false,
        errors: {
          [ApiErrorType.BAD_REQUEST]: {
            message: "Unparsable JSON",
            error,
          },
        },
      };
      return;
    }

    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        errors: {
          [ApiErrorType.BAD_REQUEST]: {
            message: "No data provided",
          },
        },
      };
      return;
    }

    const { title, isCompleted } = todo;
    if (!title) {
      response.status = 400;
      response.body = {
        success: false,
        errors: {
          [ApiErrorType.BAD_REQUEST]: {
            message: "title is required",
          },
        },
      };
      return;
    }

    // if everything is fine then perform
    // operation and return todos with the
    // new data added.
    const newTodo: Instance<Todo> = {
      id: v4.generate(),
      title,
      isCompleted: isCompleted ?? false,
    };

    // const data = [...todos, newTodo];
    response.body = {
      success: true,
      data: newTodo,
    };
  },
  /**
   * @description Get todo by id
   * @route GET todos/:id
   */
  getTodoById: ({
    params,
    response,
  }: {
    params: { id: string };
    response: Response<Instance<Todo>>;
  }) => {
    const todo: Instance<Todo> | undefined = todos.find((t) => {
      return t.id === params.id;
    });
    if (!todo) {
      response.status = 404;
      response.body = {
        success: false,
        errors: {
          [ErrorCode.NOT_FOUND]: {
            message: `Todo with id=${params.id} does not exist`,
          },
        },
      };
      return;
    }

    // If todo is found
    response.status = 200;
    response.body = {
      success: true,
      data: todo,
    };
  },
  /**
   * @description Update todo by id
   * @route PUT todos/:id
   */
  updateTodoById: async ({
    params,
    request,
    response,
  }: {
    params: { id: string };
    request: Request;
    response: Response<Instance<Todo>>;
  }) => {
    const todo: Instance<Todo> | undefined = todos.find(
      (t) => t.id === params.id
    );
    if (!todo) {
      response.status = 404;
      response.body = {
        success: false,
        errors: {
          [ApiErrorType.NOT_FOUND]: {
            message: `Todo with id=${params.id} does not exist`,
          },
        },
      };
      return;
    }

    // if todo found then update todo
    let newTodo: Todo;

    try {
      newTodo = await request.body({ type: "json" }).value;
    } catch (error) {
      response.status = 400;
      response.body = {
        success: false,
        errors: {
          [ApiErrorType.BAD_REQUEST]: {
            message: "Unparsable JSON",
            error,
          },
        },
      };
      return;
    }

    if ("id" in newTodo) {
      response.status = 400;
      response.body = {
        success: false,
        errors: {
          [ApiErrorType.BAD_REQUEST]: {
            message: "id cannot be updated",
          },
        },
      };
      return;
    }

    const { title, isCompleted } = newTodo;
    if (!title) {
      response.status = 400;
      response.body = {
        success: false,
        errors: {
          [ApiErrorType.BAD_REQUEST]: {
            message: "title is required",
          },
        },
      };
      return;
    }

    const updatedTodo: Instance<Todo> = {
      id: todo.id,
      title,
      isCompleted: isCompleted ?? false,
    };

    response.status = 200;
    response.body = {
      success: true,
      data: updatedTodo,
    };
  },
  /**
   * @description Delete todo by id
   * @route DELETE todos/:id
   */
  deleteTodoById: ({
    params,
    response,
  }: {
    params: { id: string };
    response: Response<Instance<Todo>>;
  }) => {
    const todo: Instance<Todo> | undefined = todos.find((t) => {
      return t.id === params.id;
    });

    if (!todo) {
      response.status = 404;
      response.body = {
        success: false,
        errors: {
          [ApiErrorType.NOT_FOUND]: {
            message: `Todo with id=${params.id} does not exist`,
          },
        },
      };
      return;
    }

    // const allTodos = todos.filter((t) => t.id !== params.id);

    // remove the todo w.r.t id and return
    // remaining todos
    response.status = 200;
    response.body = {
      success: true,
      data: todo,
    };
  },
};
