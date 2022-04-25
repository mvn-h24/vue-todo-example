import { ITodoList } from "@app/types/todo/ITodoList";
import { DBSchema, IDBPDatabase } from "idb";
import { EntityRegistry } from "../core/entityRegistry";
import { useEntityClient } from "../core/client";
import { IDBEntity } from "../core/IDBEntity";
import { TodoModel, useTodoItemClient } from "./todo.model";

export interface ITodoListStoredEntity extends Omit<ITodoList, "items"> {
  id?: number;
  title: string;
  items: Array<number>;
  editable: boolean;
}
export interface TodoListEntSchema extends DBSchema {
  [EntityRegistry.todolist]: {
    key: number;
    value: ITodoListStoredEntity;
  };
}
class TodoList extends IDBEntity<EntityRegistry.todolist, TodoListEntSchema> {
  protected tName: EntityRegistry.todolist = EntityRegistry.todolist;
  constructor(
    db: IDBPDatabase<TodoListEntSchema>,
    private todoEntity: TodoModel
  ) {
    super(db);
  }

  getAllPopulate(): Promise<Array<ITodoList>> {
    return this.getAll().then(async (lists) => {
      const populatedLists = [];
      for (const list of lists) {
        const items = [];
        for (const item of list.items) {
          const todo = await this.todoEntity.getOne(item);
          if (todo) {
            items.push(todo);
          }
        }
        populatedLists.push({ ...list, items });
      }
      return populatedLists;
    });
  }
}
export function useTodoListClient() {
  return useEntityClient<EntityRegistry.todolist, TodoListEntSchema>(
    EntityRegistry.todolist
  ).then(async (db) => new TodoList(db, await useTodoItemClient()));
}
