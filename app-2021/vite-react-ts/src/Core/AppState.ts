import { ClassMetadata, Entity } from "./Metadata";
import { Crud } from "./Crud";

export type AppState = {
  allMetadata: ClassMetadata[];
  classMetadata: ClassMetadata;
  entity: Entity | null;
  entities: Entity[];
  crud: Crud<Entity>;
};
