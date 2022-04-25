import { ITodoList } from "@app/types/todo/ITodoList";

export function TodoListFactory(initValues?: Partial<ITodoList>): ITodoList {
  const defaultModel: ITodoList = {
    title: "",
    editable: true,
    sort: 0,
  };
  return initValues ? { ...defaultModel, ...initValues } : defaultModel;
}
