import { Dispatch } from "react";
import {
  AppAction,
  CreateChangeEntityDataAction,
  CreateDeleteEntityAction,
  CreateSaveEntityAction,
  CreateSetEntitiesAction,
  CreateSetEntityAction,
  CreateSetMetadataAction,
} from "./appFunctions";
import { ClassMetadata, Entity } from "./Metadata";
import { AppState } from "./AppState";

export class AppService {
  constructor(dispatch: Dispatch<AppAction>) {
    this.dispatch = dispatch;
  }

  setMetadata(classMetadata: ClassMetadata) {
    this.dispatch(CreateSetMetadataAction(classMetadata));
  }

  setEntity(entity: Entity) {
    this.dispatch(CreateSetEntityAction(entity));
  }

  async saveEntity(state: AppState) {
    let entity = state.entity;
    if (!entity) {
      throw new Error("The entity must be assigned in order to be saved.");
    }
    for (const property of state.classMetadata.properties) {
      const name = property.name;
      entity[name] = (document.getElementById(name) as HTMLInputElement)?.value;
    }

    entity = (await state.crud.save(entity)) as Entity;

    this.dispatch(CreateSaveEntityAction(entity));
  }

  async deleteEntity(state: AppState) {
    const entity = state.entity;
    if (!entity) {
      throw new Error("The entity must be assigned in order to be deleted.");
    }
    await state.crud.delete(entity);

    this.dispatch(CreateDeleteEntityAction(entity));
  }

  createEntity() {
    this.dispatch({ type: "createEntity" });
  }

  changeEntityData(name: string, value: unknown) {
    this.dispatch(CreateChangeEntityDataAction(name, value));
  }

  setEntities(entities: Entity[]) {
    this.dispatch(CreateSetEntitiesAction(entities));
  }

  private readonly dispatch: Dispatch<AppAction>;
}
