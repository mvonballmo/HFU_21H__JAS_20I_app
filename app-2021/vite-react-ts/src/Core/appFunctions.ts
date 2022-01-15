import { Crud } from "./Crud.js";
import { createMetadata } from "./metadataFactory.js";
import { AppState } from "./AppState";
import { ClassMetadata, Entity } from "./Metadata";

enum ActionType {
  setMetadata = "setMetadata",
  setEntity = "setEntity",
  saveEntity = "saveEntity",
  deleteEntity = "deleteEntity",
  createEntity = "createEntity",
  changeEntityData = "changeEntityData",
  setEntities = "setEntities",
}

interface SetMetadataAction {
  type: ActionType.setMetadata;
  classMetadata: ClassMetadata;
}

interface SetEntityAction {
  type: ActionType.setEntity;
  entity: Entity;
}

interface SaveEntityAction {
  type: ActionType.saveEntity;
  entity: Entity;
}

interface DeleteEntityAction {
  type: ActionType.deleteEntity;
  entity: Entity;
}

interface CreateEntityAction {
  type: ActionType.createEntity;
}

interface ChangeEntityDataAction {
  type: ActionType.changeEntityData;
  name: string;
  value: unknown;
}

interface SetEntitiesAction {
  type: ActionType.setEntities;
  entities: Entity[];
}

type AppAction =
  | SetMetadataAction
  | SetEntityAction
  | SaveEntityAction
  | DeleteEntityAction
  | CreateEntityAction
  | ChangeEntityDataAction
  | SetEntitiesAction;

export function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "setMetadata":
      return {
        ...state,
        classMetadata: action.classMetadata,
        crud: new Crud(action.classMetadata.rootUrl),
      };
    case "setEntity":
      return { ...state, entity: action.entity };
    case "saveEntity": {
      const savedEntity = action.entity;
      const newEntities = state.entities.filter(e => e.id).map(e => (savedEntity.id === e.id ? savedEntity : e));
      if (newEntities.indexOf(savedEntity) === -1) {
        newEntities.push(savedEntity);
      }

      return { ...state, entity: savedEntity, entities: newEntities };
    }
    case "deleteEntity": {
      const entityToDelete = action.entity;
      const entities = state.entities;

      let entityToSelect = state.entity;
      if (entityToDelete.id === state.entity.id) {
        const index = entities.indexOf(entityToDelete);
        if (index < 0) {
          // Do nothing; entityToDelete is not in list
        } else {
          entityToSelect = index > 0 ? entities[index - 1] : entities[index + 1];
        }
      }

      const newEntities = entities.filter(e => e.id !== entityToDelete.id);

      return { ...state, entity: entityToSelect, entities: newEntities };
    }
    case "createEntity": {
      const newEntity = state.classMetadata.createNew();
      return { ...state, entity: newEntity, entities: [...state.entities, newEntity] };
    }
    case "changeEntityData": {
      const { entity } = state;
      const { name, value } = action;
      const newEntity = {
        ...entity,
        [name]: value,
      };

      return { ...state, entity: newEntity };
    }
    case "setEntities":
      return {
        ...state,
        entities: action.entities,
        entity: action.entities.length > 0 ? action.entities[0] : null,
      };
    default:
      throw new Error(`Unknown action [${action.type}]`);
  }
}

export function createInitialState(): AppState {
  const rootUrl = "http://localhost:3000/";
  const allMetadata = createMetadata(rootUrl);
  const classMetadata = allMetadata[0];

  return {
    allMetadata,
    classMetadata,
    crud: new Crud(classMetadata.rootUrl),
    entities: [],
    entity: null,
  };
}
