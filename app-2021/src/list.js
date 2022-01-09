class List extends HTMLElement {
  /** @type Detail */
  detail;

  /** @type address[] */
  addresses;

  /** @type address */
  #selected;

  /** @type address[] */
  get data() {
    return this.addresses;
  }

  get selected() {
    return this.#selected;
  }

  set selected(value) {
    this.#selected = value;

    const listItem = document.getElementById(this.#getListItemId(value));
    if (listItem) {
      this.#configureListItem(listItem, value);
    } else {
      this.#reloadList();
    }
  }

  /**
   * @param {address[]} value
   */
  set data(value) {
    this.addresses = value;
    this.#reloadList();
  }

  #reloadList() {
    this.innerHTML = "";
    for (const address of this.addresses) {
      const listItem = document.createElement("a");
      listItem.href = "#";
      listItem.id = this.#getListItemId(address);
      this.#configureListItem(listItem, address);

      const div = document.createElement("div");
      div.appendChild(listItem);

      this.appendChild(div);
    }

    this.detail.data = this.addresses[0];
  }

  #getListItemId(address) {
    return `list_item_${address.id}`;
  }

  #configureListItem(listItem, address) {
    const self = this;
    this.#removeEventListeners(listItem);

    listItem.addEventListener("click", function () {
      self.detail.data = address;
    });
    listItem.textContent = `${address.firstName} ${address.lastName}`;
  }

  #removeEventListeners(listItem) {
    // NOTE: This is a trick that results in removing all DOM modifications,
    // including event listeners.

    // eslint-disable-next-line no-self-assign
    listItem.innerHTML = listItem.innerHTML;
  }
}

customElements.define("app-list", List);
