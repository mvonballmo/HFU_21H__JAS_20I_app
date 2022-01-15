import { ClassMetadata } from "./Metadata";

export function createMetadata(rootUrl: string): ClassMetadata[] {
  return [
    createAddressMetadata(rootUrl),
    createCarMetadata(rootUrl),
    createAlbumMetadata(rootUrl),
    createNoteMetadata(rootUrl),
  ];
}

export function createAddressMetadata(rootUrl: string): ClassMetadata {
  return {
    caption: "Address",
    pluralCaption: "Addresses",
    rootUrl: `${rootUrl}addresses`,
    getTitle: a => `${a.firstName} ${a.lastName}`,
    createNew: () => ({ id: undefined, firstName: "", lastName: "", salary: "" }),
    properties: [
      {
        name: "firstName",
        type: "text",
        caption: "First Name",
      },
      {
        name: "lastName",
        type: "text",
        caption: "Last Name",
      },
      {
        name: "salary",
        type: "text",
        caption: "Salary",
      },
    ],
  };
}

export function createCarMetadata(rootUrl: string): ClassMetadata {
  return {
    caption: "Car",
    pluralCaption: "Cars",
    rootUrl: `${rootUrl}cars`,
    getTitle: c => `${c.make} ${c.model}`,
    createNew: () => ({ id: undefined, make: "", model: "" }),
    properties: [
      {
        name: "make",
        type: "text",
        caption: "Make",
      },
      {
        name: "model",
        type: "text",
        caption: "Model",
      },
    ],
  };
}

export function createAlbumMetadata(rootUrl: string): ClassMetadata {
  return {
    caption: "Album",
    pluralCaption: "Albums",
    rootUrl: `${rootUrl}albums`,
    getTitle: a => `${a.title}`,
    createNew: () => ({ id: undefined, title: "", description: "" }),
    properties: [
      {
        name: "title",
        type: "text",
        caption: "Title",
      },
      {
        name: "description",
        type: "text",
        caption: "Description",
      },
    ],
  };
}

export function createNoteMetadata(rootUrl: string): ClassMetadata {
  return {
    caption: "Note",
    pluralCaption: "Notes",
    rootUrl: `${rootUrl}notes`,
    getTitle: n => `${n.title}`,
    createNew: () => ({ id: undefined, title: "", description: "" }),
    properties: [
      {
        name: "title",
        type: "text",
        caption: "Title",
      },
      {
        name: "description",
        type: "text",
        caption: "Description",
      },
    ],
  };
}
