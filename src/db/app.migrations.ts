import { DBClient } from "./core/client";
import { EntityRegistry } from "./core/entityRegistry";
import { TodoEntSchema } from "./entity/todo.model";
import { TodoListEntSchema } from "./entity/todo-list.model";

interface AppScheme extends TodoEntSchema, TodoListEntSchema {}
export function InstallMigrations() {
  return new DBClient<EntityRegistry, AppScheme>().setup(
    [EntityRegistry.todolist, EntityRegistry.todo],
    1
  );
}
