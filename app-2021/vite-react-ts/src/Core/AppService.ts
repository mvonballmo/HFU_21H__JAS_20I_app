import { Dispatch } from "react";
import { ActionType, AppAction } from "../../../common/appFunctions";
import { ClassMetadata, Entity } from "./Metadata";
import { AppState } from "./AppState";

export class AppService {
  private dispatch: Dispatch<AppAction>;
  constructor(dispatch: Dispatch<AppAction>) {
    this.dispatch = dispatch;
  }

  setMetadata(classMetadata: ClassMetadata) {
    this.dispatch({ type: "setMetadata", classMetadata });
  }

  setEntity(entity: Entity) {
    this.dispatch({ type: "setEntity", entity });
  }

  async saveEntity(state: AppState) {
    let entity = state.entity;
    for (const property of state.classMetadata.properties) {
      const name = property.name;
      entity[name] = document.getElementById(name).value;
    }

    entity = await state.crud.save(entity);

    this.dispatch({ type: "saveEntity", entity });
  }

  async deleteEntity(state: AppState) {
    await state.crud.delete(state.entity);

    this.dispatch({ type: "deleteEntity", entity: state.entity });
  }

  createEntity() {
    this.dispatch({ type: "createEntity" });
  }

  changeEntityData(name: string, value: unknown) {
    this.dispatch({ type: "changeEntityData", name, value });
  }

  setEntities(entities: Entity[]) {
    this.dispatch({ type: "setEntities", entities });
  }
}
