import { ITodoItem } from "@app/types/todo/ITodoItem";
import { ITodoList } from "@app/types/todo/ITodoList";

export interface IWorkspaceActions {
  updateTodoListItem(
    idTodoList: number,
    idTodoItem: number,
    dto: ITodoItem
  ): void;
  addTodoListItem(idTodoList: number, dto: ITodoItem): void;
  addTodoList(dto?: Partial<ITodoList>): void;
}
