class Header extends HTMLElement {
  /**
   * @param {ClassMetadata} value
   */
  async setMetadata(value) {
    this.innerHTML = `<h1>${value.pluralCaption}</h1>`;
  }
}

customElements.define("app-header", Header);
