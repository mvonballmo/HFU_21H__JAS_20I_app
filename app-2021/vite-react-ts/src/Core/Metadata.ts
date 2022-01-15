export type Entity = {
  id: number;
  [otherOptions: string]: unknown;
};

type TitleGetter = (obj: Entity) => string;
type EntityCreator = () => Entity;

type TypeMetadata = "text";

export class PropertyMetadata {
  name: string;
  type: TypeMetadata;
  caption: string;

  constructor(name: string, caption: string, type: TypeMetadata) {
    this.name = name;
    this.type = type;
    this.caption = caption;
  }
}

export class ClassMetadata {
  caption: string;
  pluralCaption: string;
  rootUrl: string;
  properties: PropertyMetadata[];
  getTitle: TitleGetter;
  createNew: EntityCreator;

  constructor(
    caption: string,
    pluralCaption: string,
    rootUrl: string,
    fields: PropertyMetadata[],
    getTitle: TitleGetter,
    createNew: EntityCreator,
  ) {
    this.caption = caption;
    this.pluralCaption = pluralCaption;
    this.rootUrl = rootUrl;
    this.properties = fields;
    this.getTitle = getTitle;
    this.createNew = createNew;
  }
}
