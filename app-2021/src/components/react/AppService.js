export class AppService {
  constructor(dispatch) {
    this.dispatch = dispatch;
  }

  setMetadata(classMetadata) {
    this.dispatch({ type: "setMetadata", classMetadata });
  }

  setEntity(entity) {
    this.dispatch({ type: "setEntity", entity });
  }

  async saveEntity(state) {
    let entity = state.entity;
    for (const property of state.classMetadata.properties) {
      const name = property.name;
      entity[name] = document.getElementById(name).value;
    }

    entity = await state.crud.save(entity);

    this.dispatch({ type: "saveEntity", entity });
  }

  async deleteEntity(state) {
    await state.crud.delete(state.entity);

    this.dispatch({ type: "deleteEntity", entity: state.entity });
  }

  createEntity() {
    this.dispatch({ type: "createEntity" });
  }

  changeEntityData(entity) {
    this.dispatch({ type: "changeEntityData", entity });
  }

  setEntities(entities) {
    this.dispatch({ type: "setEntities", entities });
  }
}
