export type Entity = {
  id: number | undefined;
  [otherOptions: string]: unknown;
};

type TitleGetter = (obj: Entity) => string;
type EntityCreator = () => Entity;

type TypeMetadata = "text";

export type PropertyMetadata = {
  name: string;
  type: TypeMetadata;
  caption: string;
};

export type ClassMetadata = {
  caption: string;
  pluralCaption: string;
  rootUrl: string;
  properties: PropertyMetadata[];
  getTitle: TitleGetter;
  createNew: EntityCreator;
};
