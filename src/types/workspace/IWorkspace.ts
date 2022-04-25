import { ITodoList } from "@app/types/todo/ITodoList";
import { ITodoListItem } from "@app/types/todo/ITodoListItem";

export interface IWorkspace {
  todoLists: Array<ITodoList>;
  newTodoItem: (ITodoListItem & { todoList: number }) | null;
}
