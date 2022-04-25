import { ITodoList } from "@app/types/todo/ITodoList";

export interface ITodoListActions {
  create(dto?: Partial<ITodoList>): void;
  flush(): void;
}
