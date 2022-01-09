import { crud } from "./crud.js";
import "./list.js";
import "./detail.js";

class MasterDetail extends HTMLElement {
  /**
   * @type {crud<address>}
   */
  crud;

  /** @type Detail */
  #detail;

  /** @type List */
  #list;

  async connectedCallback() {
    const rootUrl = this.getAttribute("rootUrl");

    if (!rootUrl) {
      throw new Error("Application tag must include a 'rootUrl'.");
    }

    this.crud = new crud(`${rootUrl}addresses`);

    this.innerHTML = `
      <nav>
        <h2>List</h2>
        <button id="createNew">New...</button>
        <app-list></app-list>
      </nav>
      <article>
        <h2>Detail</h2>
        <app-detail></app-detail>
      </article>
    `;

    [this.#list] = this.getElementsByTagName("app-list");
    [this.#detail] = this.getElementsByTagName("app-detail");

    this.#detail.master = this;
    this.#list.master = this;

    const createNewButton = document.getElementById("createNew");

    createNewButton.addEventListener("click", () => {
      const entity = {
        firstName: "",
        lastName: "",
      };
      this.#list.addNew(entity);
      this.#detail.entity = entity;
    });

    let entities;
    try {
      entities = await this.crud.getAll();
    } catch (e) {
      this.#list.innerHTML = e.message;
      createNewButton.disabled = true;
    }

    if (entities) {
      this.#list.entities = entities;
    }
  }

  async update(data) {
    const saved = await this.crud.save(data);

    data.id = saved.id;

    this.#list.selected = saved;
  }

  async delete(data) {
    await this.crud.delete(data);

    this.#list.delete(data);

    const entities = this.#list.entities;
    const itemToDelete = entities.find(i => i.id === data.id);
    if (itemToDelete) {
      const index = entities.indexOf(itemToDelete);
      if (index < 0) {
        // Do nothing; itemToDelete is not in list
      } else {
        let itemToSelect;
        if (index > 0) {
          itemToSelect = entities[index - 1];
        } else {
          itemToSelect = entities[index + 1];
        }

        this.#list.selected = itemToSelect;
        this.#detail.entity = itemToSelect;
      }
    }
  }

  select(data) {
    this.#detail.entity = data;
  }
}

customElements.define("app-master-detail", MasterDetail);
