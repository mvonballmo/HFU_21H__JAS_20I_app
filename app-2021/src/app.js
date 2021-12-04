import { crud } from "./crud.js";

export class application {
  initialize = async container => {
    try {
      container.innerHTML = "";
      for (const address of await this.#addresses.getAll()) {
        container.innerHTML += `${address.firstName} ${address.lastName}<br>`;
      }
    } catch (e) {
      container.innerHTML = e.message;
    }
  };

  /**
   * @type {crud<address>}
   */
  #addresses = new crud("http://localhost:3000/addresses");
}
