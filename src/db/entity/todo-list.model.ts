import { ITodoList } from "@app/types/todo/ITodoList";
import { DBSchema } from "idb";
import { EntityRegistry } from "../core/entityRegistry";
import { useEntityClient } from "../core/client";
import { IDBEntity } from "../core/IDBEntity";

export interface TodoListEntSchema extends DBSchema {
  [EntityRegistry.todolist]: {
    key: number;
    value: ITodoList;
  };
}
class TodoList extends IDBEntity<EntityRegistry.todolist, TodoListEntSchema> {
  protected tName: EntityRegistry.todolist = EntityRegistry.todolist;
}
export function useTodoListClient() {
  return useEntityClient<EntityRegistry.todolist, TodoListEntSchema>(
    EntityRegistry.todolist
  ).then(async (db) => new TodoList(db));
}
