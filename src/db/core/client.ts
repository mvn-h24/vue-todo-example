import { DBSchema, IDBPDatabase, openDB, StoreNames } from "idb";

export class DBClient<
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
  public async setup(entities: Array<EntityName>, version?: number) {
    return openDB<EntitySchema>(DBClient.dbName, version, {
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
