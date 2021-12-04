import { crud } from "./crud.js";

export class application {
  initialize = async () => {
    const listItems = document.getElementById("listItems");

    try {
      listItems.innerHTML = "";
      for (const address of await this.#addresses.getAll()) {
        listItems.innerHTML += `${address.firstName} ${address.lastName}<br>`;
      }
    } catch (e) {
      listItems.innerHTML = e.message;
    }
  };

  /**
   * @type {crud<address>}
   */
  #addresses = new crud("http://localhost:3000/addresses");
}
