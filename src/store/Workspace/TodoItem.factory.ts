import { ITodoListItem } from "@app/types/todo/ITodoListItem";

export function TodoItemFactory(
  initValues?: Partial<ITodoListItem>
): ITodoListItem {
  const defaultModel: ITodoListItem = {
    title: "",
    description: "",
  };
  return initValues ? { ...defaultModel, ...initValues } : defaultModel;
}
