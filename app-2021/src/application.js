import "./master-detail.js";
import "./header.js";

/**
 * @return ClassMetadata[]
 * @param rootUrl {string}
 */
export function createMetadata(rootUrl) {
  return [createAddressMetadata(rootUrl), createCarMetadata(rootUrl), createAlbumMetadata(rootUrl)];
}

/**
 * @return ClassMetadata
 * @param rootUrl {string}
 */
export function createAddressMetadata(rootUrl) {
  return {
    caption: "Address",
    pluralCaption: "Addresses",
    rootUrl: `${rootUrl}addresses`,
    getTitle: a => `${a.firstName} ${a.lastName}`,
    createNew: () => ({ firstName: "", lastName: "" }),
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
export function createCarMetadata(rootUrl) {
  return {
    caption: "Car",
    pluralCaption: "Cars",
    rootUrl: `${rootUrl}cars`,
    getTitle: c => `${c.make} ${c.model}`,
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
export function createAlbumMetadata(rootUrl) {
  return {
    caption: "Album",
    pluralCaption: "Albums",
    rootUrl: `${rootUrl}albums`,
    getTitle: c => `${c.title}`,
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
