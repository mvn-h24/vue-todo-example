import { ITodoListItem } from "@app/types/todo/ITodoListItem";

export interface ITodoListItemActions {
  create(dto?: Partial<ITodoListItem>): void;
  read(idTodoList: number, idTodoItem: number): void;
  update(
    idTodoList: number,
    idTodoItem: number,
    dto?: Partial<ITodoListItem>
  ): void;
  delete(idTodoList: number, idTodoItem: number): void;

  save(): Promise<void> | void;
}
