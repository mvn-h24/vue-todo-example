import { ITodoItem } from "@app/types/todo/ITodoItem";

export function TodoItemFactory(
  listId: number,
  initValues?: Partial<ITodoItem>
): ITodoItem {
  const defaultModel: ITodoItem = {
    listId,
    sort: 0,
    title: "",
    description: "",
    ready: false,
  };
  return initValues ? { ...defaultModel, ...initValues } : defaultModel;
}
