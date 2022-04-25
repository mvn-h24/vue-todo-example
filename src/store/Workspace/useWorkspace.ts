import { _GettersTree, defineStore } from "pinia";
import { IWorkspace } from "@app/types/workspace/IWorkspace";
import { WorkspaceFactory } from "@app/store/Workspace/Workspace.factory";
import { useTodoItemClient, useTodoListClient } from "@app/db";
import { TodoItemFactory } from "@app/store/Workspace/TodoItem.factory";
import { TodoListFactory } from "@app/store/Workspace/TodoList.factory";

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
  // getters: {
  //   getTodoItem: (store) => (idList: number, idItem: number) =>
  //     store.todoLists
  //       .find((v) => v.id === idList)
  //       ?.items.find((v) => v.id === idItem),
  // },
  getters: {
    newItem: (store) => store.newTodoItem,
  },
  actions: {
    async createNewTodoList() {
      const { items, ...list } = TodoListFactory();
      const client = await useTodoListClient();
      await client.addOne({ ...list, items: [] });
      return useWorkspace().load();
    },
    async load(cleanup = false) {
      const entity = await useTodoListClient();
      const todoLists = await entity.getAllPopulate();
      this.$state = WorkspaceFactory({
        todoLists,
        newTodoItem: cleanup ? null : this.newTodoItem,
      });
    },
    createListTodo(listId: number) {
      this.$state.newTodoItem = { ...TodoItemFactory(), todoList: listId };
    },
    async saveNewItem() {
      if (this.$state.newTodoItem) {
        const listEntity = await useTodoListClient();

        const todoList = await listEntity.getOne(
          this.$state.newTodoItem.todoList
        );
        if (todoList) {
          const todoEntity = await useTodoItemClient();

          const idTodo = await todoEntity.addOne({
            ...this.$state.newTodoItem,
          });
          todoList.items.push(idTodo);
          await listEntity.updateOne(
            this.$state.newTodoItem.todoList,
            todoList
          );
        }
      }
    },
  },
});
