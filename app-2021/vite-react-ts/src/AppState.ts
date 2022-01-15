import { ClassMetadata, Entity } from "./Metadata";
import { Crud } from "./crud";

export type AppState = {
  allMetadata: ClassMetadata[];
  classMetadata: ClassMetadata;
  entity: Entity | null;
  entities: Entity[];
  crud: Crud<Entity>;
};
