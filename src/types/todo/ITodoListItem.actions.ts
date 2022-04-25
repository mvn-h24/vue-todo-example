import { ITodoItem } from "@app/types/todo/ITodoItem";

export interface ITodoListItemActions {
  create(dto?: Partial<ITodoItem>): void;
  read(idTodoList: number, idTodoItem: number): void;
  update(
    idTodoList: number,
    idTodoItem: number,
    dto?: Partial<ITodoItem>
  ): void;
  delete(idTodoList: number, idTodoItem: number): void;

  save(): Promise<void> | void;
}
