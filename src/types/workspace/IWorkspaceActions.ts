import { ITodoListItem } from "@app/types/todo/ITodoListItem";
import { ITodoList } from "@app/types/todo/ITodoList";

export interface IWorkspaceActions {
  updateTodoListItem(
    idTodoList: number,
    idTodoItem: number,
    dto: ITodoListItem
  ): void;
  addTodoListItem(idTodoList: number, dto: ITodoListItem): void;
  addTodoList(dto?: Partial<ITodoList>): void;
}
