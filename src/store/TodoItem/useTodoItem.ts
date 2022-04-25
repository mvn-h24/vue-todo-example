import { _GettersTree, defineStore } from "pinia";
import { ITodoListItem } from "@app/types/todo/ITodoListItem";
import { ITodoListItemActions } from "@app/types/todo/ITodoListItem.actions";
import { TodoItemFactory } from "@app/store/TodoItem/TodoItem.factory";
import { useUserWorkspaceDB } from "../../db/workspaceClient";

export const TodoItemStoreToken = "TodoItemStore";
export const useTodoItem = defineStore<
  typeof TodoItemStoreToken,
  ITodoListItem,
  _GettersTree<ITodoListItem>,
  ITodoListItemActions
>(TodoItemStoreToken, {
  state: () => TodoItemFactory(),
  actions: {
    create(dto?: Partial<ITodoListItem>) {
      this.$state = TodoItemFactory(dto);
    },

    read(idTodoList: number, idTodoItem: number): void {},

    update(idTodoList: number, idTodoItem: number): void {},

    delete(idTodoList: number, idTodoItem: number): void {},

    save(): Promise<void> {
      return useUserWorkspaceDB().then(async (db) => {
        await db.addTodoItem({
          description: this.$state.description,
          title: this.$state.title,
        });
        this.create();
      });
    },
  },
  getters: {
    title: (state) => state.title,
    description: (state) => state.description,
  },
});
