class List extends HTMLElement {
  /** @type MasterDetail */
  master;

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

  addNew(value) {
    this.addresses.push(value);
    this.#addItem(value);
  }

  delete(value) {
    const row = this.querySelector(`#${this.#getListItemId(value)}`);
    if (row != null) {
      row.onanimationend = () => row.parentElement.removeChild(row);
      row.classList.add("removed");
    }
  }

  #reloadList() {
    this.innerHTML = "";
    for (const address of this.addresses) {
      this.#addItem(address);
    }

    if (this.selected) {
      const listItem = document.getElementById(this.#getListItemId(this.selected));
      if (!listItem) {
        this.#selected = this.addresses[0];
      }
    } else {
      this.#selected = this.addresses[0];
    }

    this.master.select(this.#selected);
  }

  #addItem(value) {
    const listItem = document.createElement("a");
    listItem.href = "#";
    listItem.id = this.#getListItemId(value);
    this.#configureListItem(listItem, value);

    const div = document.createElement("div");
    div.appendChild(listItem);

    this.appendChild(div);
  }

  #getListItemId(address) {
    return `list_item_${address.id}`;
  }

  #configureListItem(listItem, address) {
    const self = this;
    this.#removeEventListeners(listItem);

    listItem.addEventListener("click", function () {
      self.master.select(address);
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
