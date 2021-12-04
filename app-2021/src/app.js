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
        listItems.innerHTML += `${address.firstName} ${address.lastName}<br>`;
      }
    } catch (e) {
      listItems.innerHTML = e.message;
    }
  };

  /**
   * @type {crud<address>}
   */
  #addresses;
}
