import { ITodoListItem } from "@app/types/todo/ITodoListItem";

export interface ITodoList {
  id?: number;
  title: string;
  items: Array<ITodoListItem>;
  editable: boolean;
}
