import { DBSchema } from "idb";
import { ITodoItem } from "@app/types/todo/ITodoItem";
import { EntityRegistry } from "../core/entityRegistry";
import { IDBEntity } from "../core/IDBEntity";
import { useEntityClient } from "../core/client";

export interface TodoEntSchema extends DBSchema {
  [EntityRegistry.todo]: {
    key: number;
    value: ITodoItem;
  };
}

export class TodoModel extends IDBEntity<EntityRegistry.todo, TodoEntSchema> {
  protected tName: EntityRegistry.todo = EntityRegistry.todo;
  getByListId(id: number) {
    this.getAll().then((res) => res.filter((item) => item.list === id));
  }
}
export function useTodoItemClient() {
  return useEntityClient<EntityRegistry.todo, TodoEntSchema>(
    EntityRegistry.todo
  ).then((db) => new TodoModel(db));
}
