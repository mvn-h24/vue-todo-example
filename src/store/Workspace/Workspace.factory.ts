import { IWorkspace } from "@app/types/workspace/IWorkspace";

export function WorkspaceFactory(initValues?: Partial<IWorkspace>): IWorkspace {
  const defaultModel: IWorkspace = {
    todoLists: [],
    newTodoItem: null,
  };
  return initValues ? { ...defaultModel, ...initValues } : defaultModel;
}
