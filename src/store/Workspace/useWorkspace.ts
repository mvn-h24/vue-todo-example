import { _GettersTree, defineStore } from "pinia";
import { IWorkspace } from "@app/types/workspace/IWorkspace";
import { WorkspaceFactory } from "@app/store/Workspace/Workspace.factory";
import { useTodoListClient } from "@app/db";

export const TodoListStoreToken = "TodoListsStore";
export const useWorkspace = defineStore<
  typeof TodoListStoreToken,
  IWorkspace,
  _GettersTree<IWorkspace>,
  unknown
>(TodoListStoreToken, {
  state: () => {
    return WorkspaceFactory();
  },
  // getters: {
  //   getTodoItem: (store) => (idList: number, idItem: number) =>
  //     store.todoLists
  //       .find((v) => v.id === idList)
  //       ?.items.find((v) => v.id === idItem),
  // },
  actions: {
    async load() {
      const entity = await useTodoListClient();
      const todoLists = await entity.getAllPopulate();
      this.$state = WorkspaceFactory({ todoLists });
    },
  },
});
