import { ITodoListItem } from "@app/types/ITodoListItem";

export interface ITodoList {
  title: string;
  items: Array<ITodoListItem>;
  editable: boolean;
}
