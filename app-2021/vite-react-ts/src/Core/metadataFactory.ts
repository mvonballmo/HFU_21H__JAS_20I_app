/**
 * @return ClassMetadata[]
 * @param rootUrl {string}
 */
export function createMetadata(rootUrl: string) {
  return [
    createAddressMetadata(rootUrl),
    createCarMetadata(rootUrl),
    createAlbumMetadata(rootUrl),
    createNoteMetadata(rootUrl),
  ];
}

type Address = {
  id: number;
  firstName: string;
  lastName: string;
};

type Car = {
  id: number;
  model: string;
  make: string;
};

type Album = {
  id: number;
  title: string;
  description: string;
};

type Note = Album;

/**
 * @return ClassMetadata
 * @param rootUrl {string}
 */
export function createAddressMetadata(rootUrl: string) {
  return {
    caption: "Address",
    pluralCaption: "Addresses",
    rootUrl: `${rootUrl}addresses`,
    getTitle: (a: Address) => `${a.firstName} ${a.lastName}`,
    createNew: () => ({ firstName: "", lastName: "", salary: "" }),
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

/**
 * @return ClassMetadata
 * @param rootUrl {string}
 */
export function createCarMetadata(rootUrl: string) {
  return {
    caption: "Car",
    pluralCaption: "Cars",
    rootUrl: `${rootUrl}cars`,
    getTitle: (c: Car) => `${c.make} ${c.model}`,
    createNew: () => ({ make: "", model: "" }),
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

/**
 * @return ClassMetadata
 * @param rootUrl {string}
 */
export function createAlbumMetadata(rootUrl: string) {
  return {
    caption: "Album",
    pluralCaption: "Albums",
    rootUrl: `${rootUrl}albums`,
    getTitle: (a: Album) => `${a.title}`,
    createNew: () => ({ title: "", description: "" }),
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

/**
 * @return ClassMetadata
 * @param rootUrl {string}
 */
export function createNoteMetadata(rootUrl: string) {
  return {
    caption: "Note",
    pluralCaption: "Notes",
    rootUrl: `${rootUrl}notes`,
    getTitle: (n: Note) => `${n.title}`,
    createNew: () => ({ title: "", description: "" }),
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
