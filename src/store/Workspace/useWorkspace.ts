import { _GettersTree, defineStore } from "pinia";
import { IWorkspace } from "@app/types/workspace/IWorkspace";
import { WorkspaceFactory } from "@app/store/Workspace/Workspace.factory";
import { useTodoItemClient, useTodoListClient } from "@app/db";
import { TodoItemFactory } from "@app/store/Workspace/TodoItem.factory";
import { TodoListFactory } from "@app/store/Workspace/TodoList.factory";
import { ITodoItem } from "@app/types/todo/ITodoItem";
import { ITodoList } from "@app/types/todo/ITodoList";

export const TodoListStoreToken = "WorkspaceStore";
export const useWorkspace = defineStore<
  typeof TodoListStoreToken,
  IWorkspace,
  _GettersTree<IWorkspace>,
  unknown
>(TodoListStoreToken, {
  state: () => {
    return WorkspaceFactory();
  },
  getters: {
    getListItems: (store) => (listId: number) =>
      store.todoItems.filter((item) => item.listId === listId),
  },
  actions: {
    createNewTodoList() {
      return useTodoListClient()
        .then((client) => client.addOne(TodoListFactory()))
        .then(() => this.load());
    },
    async load(cleanup = false) {
      return Promise.all([useTodoListClient(), useTodoItemClient()])
        .then(([todoListClient, todoClient]) =>
          Promise.all([todoListClient.getAll(), todoClient.getAll()])
        )
        .then(([todoLists, todoItems]) => {
          this.$state = WorkspaceFactory({
            todoLists,
            todoItems,
            newTodoItem: cleanup ? null : this.newTodoItem,
          });
        });
    },
    createListTodo(listId: number) {
      this.$state.newTodoItem = TodoItemFactory(listId);
    },
    saveNewItem() {
      if (this.$state.newTodoItem) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...dto } = this.$state.newTodoItem;
        return useTodoItemClient().then((client) => client.addOne(dto));
      }
    },
    deleteItemById(id: number) {
      return useTodoItemClient()
        .then((client) => client.deleteOne(id))
        .then(() => this.load());
    },
    itemUpdate(dto: ITodoItem) {
      return useTodoItemClient()
        .then((client) => client.updateOne(dto))
        .then(() => this.load());
    },
    listUpdate(dto: ITodoList) {
      return useTodoListClient()
        .then((client) => client.updateOne(dto))
        .then(() => this.load());
    },
  },
});
