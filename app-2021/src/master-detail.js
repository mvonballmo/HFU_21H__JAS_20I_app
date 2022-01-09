import { crud } from "./crud.js";
import "./list.js";
import "./detail.js";

class MasterDetail extends HTMLElement {
  /**
   * @type {crud<address>}
   */
  crud;

  /** @type Detail */
  detail;

  /** @type List */
  list;

  async connectedCallback() {
    const rootUrl = this.getAttribute("rootUrl");

    if (!rootUrl) {
      throw new Error("Application tag must include a 'rootUrl'.");
    }

    this.crud = new crud(`${rootUrl}addresses`);

    this.innerHTML = `
      <nav>
        <h2>List</h2>
        <app-list></app-list>
      </nav>
      <article>
        <h2>Detail</h2>
        <app-detail></app-detail>
      </article>
    `;

    [this.list] = this.getElementsByTagName("app-list");
    [this.detail] = this.getElementsByTagName("app-detail");

    this.detail.master = this;
    this.list.master = this;

    try {
      this.list.data = await this.crud.getAll();
    } catch (e) {
      this.list.innerHTML = e.message;
    }
  }

  async update(data) {
    await this.crud.update(data);

    this.list.selected = data;
  }

  async delete(data) {
    await this.crud.delete(data);

    this.list.delete(data);

    const addresses = this.list.data;
    const itemToDelete = addresses.find(i => i.id === data.id);
    if (itemToDelete) {
      const index = addresses.indexOf(itemToDelete);
      if (index < 0) {
        // Do nothing; itemToDelete is not in list
      } else {
        let itemToSelect;
        if (index > 0) {
          itemToSelect = addresses[index - 1];
        } else {
          itemToSelect = addresses[index + 1];
        }

        this.list.selected = itemToSelect;
        this.detail.data = itemToSelect;
      }
    }
  }

  select(data) {
    this.detail.data = data;
  }
}

customElements.define("app-master-detail", MasterDetail);
