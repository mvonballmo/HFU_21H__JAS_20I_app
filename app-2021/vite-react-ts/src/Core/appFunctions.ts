import { Crud } from "./Crud.js";
import { createMetadata } from "./metadataFactory.js";
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

interface SetEntitiesAction {
  type: "setEntities";
  entities: Entity[];
}

export type AppAction =
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
      if (entityToDelete.id === state.entity?.id) {
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
      if (!entity) {
        throw new Error("The entity must be assigned in order to be modifed.");
      }

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
