import { ClassMetadata, Entity } from "./Metadata";
import { AppState } from "./AppState";

export class AppService {
  constructor(dispatch: Dispatch<AppAction>);

  setMetadata(classMetadata: ClassMetadata);

  setEntity(entity: Entity): void;

  saveEntity(state: AppState): Promise;

  deleteEntity(state: AppState): Promise;

  createEntity();

  changeEntityData(name: string, value: unknown);

  setEntities(entities: Entity[]);
}
