import { ITodoList } from "@app/types/todo/ITodoList";
import { ITodoItem } from "@app/types/todo/ITodoItem";

export interface IWorkspace {
  todoLists: Array<ITodoList>;
  todoItems: Array<ITodoItem>;
  newTodoItem: ITodoItem | null;
}
