import { DBSchema } from "idb";
import { ITodoListItem } from "@app/types/todo/ITodoListItem";
import { EntityRegistry } from "../core/entityRegistry";
import { IDBEntity } from "../core/IDBEntity";
import { useEntityClient } from "../core/client";

export interface TodoEntSchema extends DBSchema {
  [EntityRegistry.todo]: {
    key: number;
    value: ITodoListItem;
  };
}

export class TodoModel extends IDBEntity<EntityRegistry.todo, TodoEntSchema> {
  protected tName: EntityRegistry.todo = EntityRegistry.todo;
}
export function useTodoItemClient() {
  return useEntityClient<EntityRegistry.todo, TodoEntSchema>(
    EntityRegistry.todo
  ).then((db) => new TodoModel(db));
}
