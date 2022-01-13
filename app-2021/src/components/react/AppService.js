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

  saveEntity(entity) {
    this.dispatch({ type: "saveEntity", entity });
  }

  deleteEntity(entity) {
    this.dispatch({ type: "deleteEntity", entity });
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
