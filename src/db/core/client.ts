import { DBSchema, IDBPDatabase, openDB, StoreNames } from "idb";

class DBClient<
  EntityName extends StoreNames<EntitySchema>,
  EntitySchema extends DBSchema
> {
  private static dbName = "UserWorkspace";
  private tableFactory(name: EntityName, db: IDBPDatabase<EntitySchema>) {
    db.createObjectStore(name, {
      keyPath: "id",
      autoIncrement: true,
    });
  }
  public setup(entities: Array<EntityName>) {
    return openDB<EntitySchema>(DBClient.dbName, 1, {
      upgrade: (db) => {
        entities.forEach((name) => this.tableFactory(name, db));
      },
    });
  }
}

export function useEntityClient<
  ename extends StoreNames<escheme>,
  escheme extends DBSchema
>(tabName: ename) {
  return new DBClient<ename, escheme>().setup([tabName]);
}
