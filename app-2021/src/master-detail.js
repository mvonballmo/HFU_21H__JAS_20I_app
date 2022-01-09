import { crud } from "./crud.js";
import "./list.js";
import "./detail.js";

class MasterDetail extends HTMLElement {
  /**
   * @type {crud<address>}
   */
  addresses;

  async connectedCallback() {
    const rootUrl = this.getAttribute("rootUrl");

    if (!rootUrl) {
      throw new Error("Application tag must include a 'rootUrl'.");
    }

    this.addresses = new crud(`${rootUrl}addresses`);

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

    this.detail.crud = this.addresses;

    this.list.detail = this.detail;
    this.detail.list = this.list;

    try {
      this.list.data = await this.addresses.getAll();
    } catch (e) {
      this.list.innerHTML = e.message;
    }
  }
}

customElements.define("app-master-detail", MasterDetail);
