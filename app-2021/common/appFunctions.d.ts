import { AppState } from "./AppState";
import { ClassMetadata, Entity } from "./Metadata";

interface SetMetadataAction {
  type: "setMetadata";
  classMetadata: ClassMetadata;
}

interface SetEntityAction {
  type: "setEntity";
  entity: Entity;
}

interface SaveEntityAction {
  type: "saveEntity";
  entity: Entity;
}

interface DeleteEntityAction {
  type: "deleteEntity";
  entity: Entity;
}

interface CreateEntityAction {
  type: "createEntity";
}

interface ChangeEntityDataAction {
  type: "changeEntityData";
  name: string;
  value: unknown;
}

type AppAction =
  | SetMetadataAction
  | SetEntityAction
  | SaveEntityAction
  | DeleteEntityAction
  | CreateEntityAction
  | ChangeEntityDataAction;

export function reducer(state: AppState, action: AppAction): AppState;

export function createInitialState(): AppState;
