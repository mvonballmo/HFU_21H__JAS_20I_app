type Entity = Record<string, unknown>;
type TitleGetter = (obj: Entity) => string;
type EntityCreator = () => Entity;

type TypeMetadata = "text";

class PropertyMetadata {
  name: string;
  type: TypeMetadata;
  caption: string;

  constructor(name: string, caption: string, type: TypeMetadata) {
    this.name = name;
    this.type = type;
    this.caption = caption;
  }
}

class ClassMetadata {
  rootUrl: string;
  properties: PropertyMetadata[];
  getTitle: TitleGetter;
  createNew: EntityCreator;

  constructor(rootUrl: string, fields: PropertyMetadata[], getTitle: TitleGetter, createNew: EntityCreator) {
    this.rootUrl = rootUrl;
    this.properties = fields;
    this.getTitle = getTitle;
    this.createNew = createNew;
  }
}
