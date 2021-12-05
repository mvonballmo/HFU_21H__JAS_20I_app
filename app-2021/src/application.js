import { crud } from "./crud.js";

export class application {
  /**
   * @type {crud<address>}
   */
  addresses;

  constructor(rootUrl) {
    this.addresses = new crud(`${rootUrl}addresses`);
  }

  initialize = async () => {
    const listItems = document.getElementById("listItems");
    const application = this;

    try {
      listItems.innerHTML = "";
      let addresses = await this.addresses.getAll();
      for (const address of addresses) {
        const link = document.createElement("a");
        link.href = "#";
        link.addEventListener("click", () => application.#showDetail(address));
        link.textContent = `${address.firstName} ${address.lastName}`;

        const div = document.createElement("div");
        div.appendChild(link);

        listItems.appendChild(div);
      }

      this.#showDetail(addresses[0]);
    } catch (e) {
      listItems.innerHTML = e.message;
    }
  };

  /**
   * @param {address} address
   */
  #showDetail(address) {
    const detail = document.getElementById("detail");
    const application = this;

    detail.innerHTML = `
      <label>First Name</label><input type="text" id="firstName" value="${address.firstName}">
      <label>Last Name</label><input type="text" id="lastName" value="${address.lastName}">
    `;

    const saveButton = document.createElement("button");
    saveButton.id = "save";
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", async () => await application.#saveDetail(address));

    detail.append(document.createElement("span")); // spacer in the first column
    detail.append(saveButton);
  }

  /**
   * @param {address} address
   */
  async #saveDetail(address) {
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");

    address.firstName = firstName.value;
    address.lastName = lastName.value;

    await this.addresses.update(address);

    // TODO Update the item in the list
  }
}
