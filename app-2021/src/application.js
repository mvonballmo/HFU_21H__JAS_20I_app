import "./master-detail.js";

/**
 * @return ClassMetadata
 * @param rootUrl {string}
 */
export function createAddressMetadata(rootUrl) {
  return {
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
