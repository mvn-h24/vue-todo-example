import { ITodoListItem } from "@app/types/todo/ITodoListItem";

export interface IUserWorkspaceActions {
  updateTodo(todoListId: number, todoId: number, item: ITodoListItem): void;
  addTodo(todoListId: number, item: ITodoListItem): void;
}
