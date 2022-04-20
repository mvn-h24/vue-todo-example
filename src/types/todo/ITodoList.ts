import { ITodoListItem } from "@app/types/todo/ITodoListItem";

export interface ITodoList {
  title: string;
  items: Array<ITodoListItem>;
  editable: boolean;
}
