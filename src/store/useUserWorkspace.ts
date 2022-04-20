import { _GettersTree, defineStore } from "pinia";
import { IUserWorkspace } from "@app/types/workspace/IUserWorkspace";
import { useUserWorkspaceMock } from "@app/store/useUserWorkspace.mock";
import { ITodoListItem } from "@app/types/todo/ITodoListItem";
import { IUserWorkspaceActions } from "@app/types/workspace/IUserWorkspaceActions";

export const TodoListStoreToken = "TodoListsStore";
export const useUserWorkspace = defineStore<
  typeof TodoListStoreToken,
  IUserWorkspace,
  _GettersTree<IUserWorkspace>,
  IUserWorkspaceActions
>(TodoListStoreToken, {
  state: () => useUserWorkspaceMock,
  actions: {
    updateTodo(todoListId: number, todoId: number, item: ITodoListItem) {
      if (this.todoLists.at(todoListId)?.items.at(todoId) !== undefined) {
        this.todoLists.at(todoListId)?.items.splice(todoId, 1, item);
      }
    },
  },
});
