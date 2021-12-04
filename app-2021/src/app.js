import { crud } from "./crud.js";

export class application {
  constructor(rootUrl){
    this.#addresses = new crud(`${rootUrl}addresses`)
  }

  initialize = async () => {
    const listItems = document.getElementById("listItems");

    try {
      listItems.innerHTML = "";
      for (const address of await this.#addresses.getAll()) {
        const link = document.createElement("a");
        link.href = "#";
        const application = this;
        link.addEventListener("click", () => application.#showDetail(address));

        const div = document.createElement("div");
        div.appendChild(link);

        listItems.appendChild(div);
      }
    } catch (e) {
      listItems.innerHTML = e.message;
    }
  };

  /**
   * @param {address} address
   */
  #showDetail(address) {
    const detail = document.getElementById("detail");

    detail.innerHTML = `${address.firstName} ${address.lastName}`;
  }

  /**
   * @type {crud<address>}
   */
  #addresses;
}
