import { v4 } from "std/uuid/mod.ts";
import { Instance } from "../interfaces/Instance.ts";
// interface
import Todo from "../interfaces/Todo.ts";

const todos: Array<Instance<Todo>> = [
  {
    id: v4.generate(),
    title: "walk dog",
    isCompleted: true,
  },
  {
    id: v4.generate(),
    title: "eat food",
    isCompleted: false,
  },
];

export default todos;
