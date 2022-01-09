import "./master-detail.js";

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
