import { AppState } from "./AppState";
import { ClassMetadata, Entity } from "./Metadata";

enum ActionType {
  setMetadata,
  setEntity,
  saveEntity,
  deleteEntity,
  createEntity,
  changeEntityData,
  setEntities,
}

interface SetMetadataAction {
  type: ActionType.setMetadata;
  classMetadata: ClassMetadata;
}

interface SetEntityAction extends Action {
  type: ActionType.setEntity;
  entity: Entity;
}

interface SaveEntityAction extends Action {
  type: ActionType.saveEntity;
  entity: Entity;
}

interface DeleteEntityAction extends Action {
  type: ActionType.deleteEntity;
  entity: Entity;
}

interface CreateEntityAction extends Action {
  type: ActionType.createEntity;
}

interface ChangeEntityDataAction extends Action {
  type: ActionType.changeEntityData;
  name: string;
  value: unknown;
}

// function createSetMetadataAction(classMetadata: ClassMetadata) {
//
// }

type AppAction =
  | SetMetadataAction
  | SetEntityAction
  | SaveEntityAction
  | DeleteEntityAction
  | CreateEntityAction
  | ChangeEntityDataAction;

export function reducer(state: AppState, action: AppAction);

export function createInitialState(): AppState;
