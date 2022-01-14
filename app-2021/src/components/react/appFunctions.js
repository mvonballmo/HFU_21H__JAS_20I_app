import { Crud } from "../../utils/crud.js";
import { createMetadata } from "../../metadataFactory.js";

export function reducer(state, action) {
  switch (action.type) {
    case "setMetadata":
      return resetState(state, action.classMetadata);
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

export const createInitialState = () => {
  const rootUrl = "http://localhost:3000/";
  const allMetadata = createMetadata(rootUrl);
  const classMetadata = allMetadata[0];

  return resetState({ allMetadata }, classMetadata);
};

function resetState(state, classMetadata) {
  return {
    ...state,
    classMetadata,
    crud: new Crud(classMetadata.rootUrl),
  };
}
