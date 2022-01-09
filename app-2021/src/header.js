class Header extends HTMLElement {
  /** @type ClassMetadata[] */
  #metadata;
  /** @type ClassMetadata */
  #selected;

  /** @type MasterDetail */
  masterDetail;

  /**
   * @param {ClassMetadata[]} value
   */
  async setMetadata(value) {
    this.#metadata = value;
    this.#selected = this.#metadata[0];

    const title = document.createElement("h1");
    title.textContent = this.#selected.pluralCaption;

    const list = document.createElement("ul");
    for (const metaDatum of this.#metadata) {
      const link = document.createElement("a");
      link.href = "#";
      link.textContent = metaDatum.pluralCaption;
      link.addEventListener("click", () => {
        this.masterDetail.setMetadata(metaDatum);
      });
      const item = document.createElement("li");
      item.append(link);
      list.append(item);
    }

    this.innerHTML = "";
    this.append(title);
    this.append(list);

    await this.masterDetail.setMetadata(this.#metadata[0]);
  }
}

customElements.define("app-header", Header);
