import { crud } from "./crud.js";

export class application {
  constructor(rootUrl) {
    this.#addresses = new crud(`${rootUrl}addresses`);
  }

  initialize = async () => {
    const listItems = document.getElementById("listItems");

    try {
      listItems.innerHTML = "";
      let addresses = await this.#addresses.getAll();
      for (const address of addresses) {
        const link = document.createElement("a");
        link.href = "#";
        const application = this;
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

    detail.innerHTML = `
      <label>First Name</label><input type="text" value="${address.firstName}">
      <label>Last Name</label><input type="text" value="${address.lastName}">
    `;
  }

  /**
   * @type {crud<address>}
   */
  #addresses;
}
