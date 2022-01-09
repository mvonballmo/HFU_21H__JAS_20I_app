import { crud } from "./crud.js";
import "./list.js";
import "./detail.js";

class MasterDetail extends HTMLElement {
  /**
   * @type {#crud<address>}
   */
  crud;

  /** @type Detail */
  #detail;

  /** @type List */
  #list;

  /** @type ClassMetadata */
  #metadata;

  get metadata() {
    return this.#metadata;
  }

  /**
   * @param {ClassMetadata} value
   */
  async setMetadata(value) {
    this.#metadata = value;

    this.crud = new crud(this.#metadata.rootUrl);

    this.innerHTML = `
      <nav>
        <button id="createNew">New...</button>
        <app-list></app-list>
      </nav>
      <article>
        <app-detail></app-detail>
      </article>
    `;

    [this.#list] = this.getElementsByTagName("app-list");
    [this.#detail] = this.getElementsByTagName("app-detail");

    this.#detail.master = this;
    this.#list.master = this;

    const createNewButton = document.getElementById("createNew");

    createNewButton.addEventListener("click", () => {
      const entity = this.#metadata.createNew();

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

  async update(entity) {
    const saved = await this.crud.save(entity);

    entity.id = saved.id;

    this.#list.selected = saved;
  }

  async delete(entity) {
    const entities = this.#list.entities;
    const itemToDelete = entities.find(i => i.id === entity.id);
    const index = entities.indexOf(itemToDelete);

    await this.crud.delete(entity);
    this.#list.delete(entity);

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

  select(entity) {
    this.#list.selected = entity;
    this.#detail.entity = entity;
  }
}

customElements.define("app-master-detail", MasterDetail);
