import { _GettersTree, defineStore } from "pinia";
import { ITodoList } from "@app/types/todo/ITodoList";
import { ITodoListActions } from "@app/types/todo/ITodoList.actions";
import { TodoListFactory } from "./TodoList.factory";

export const TodoItemStoreToken = "TodoListStore";
export const useTodoList = defineStore<
  typeof TodoItemStoreToken,
  ITodoList,
  _GettersTree<ITodoList>,
  ITodoListActions
>(TodoItemStoreToken, {
  state: () => TodoListFactory(),
  actions: {
    create(dto?: Partial<ITodoList>) {
      this.$state = TodoListFactory(dto);
    },
    flush() {
      this.$state = TodoListFactory();
    },
  },
  getters: {
    title: (state) => state.title,
    editable: (state) => state.editable,
    items: (state) => state.items,
  },
});
