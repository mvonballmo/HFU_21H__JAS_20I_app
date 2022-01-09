class List extends HTMLElement {
  /** @type MasterDetail */
  master;

  #entities;

  #selected;

  get entities() {
    return this.#entities;
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

  set entities(value) {
    this.#entities = value;
    this.#reloadList();
  }

  addNew(value) {
    this.#entities.push(value);
    this.#addItem(value);
  }

  delete(value) {
    const index = this.#entities.indexOf(value);

    if (index) {
      this.#entities.splice(index, 1);
    }

    const row = this.querySelector(`#${this.#getListItemId(value)}`);
    if (row != null) {
      row.onanimationend = () => row.parentElement.removeChild(row);
      row.classList.add("removed");
    }
  }

  #reloadList() {
    this.innerHTML = "";
    for (const entity of this.#entities) {
      this.#addItem(entity);
    }

    if (this.selected) {
      const listItem = document.getElementById(this.#getListItemId(this.selected));
      if (!listItem) {
        this.#selected = this.#entities[0];
      }
    } else {
      this.#selected = this.#entities[0];
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

  #getListItemId(entity) {
    return `list_item_${entity.id}`;
  }

  #configureListItem(listItem, entity) {
    const self = this;
    this.#removeEventListeners(listItem);

    listItem.addEventListener("click", function () {
      self.master.select(entity);
    });
    listItem.textContent = `${entity.firstName} ${entity.lastName}`;
  }

  #removeEventListeners(listItem) {
    // NOTE: This is a trick that results in removing all DOM modifications,
    // including event listeners.

    // eslint-disable-next-line no-self-assign
    listItem.innerHTML = listItem.innerHTML;
  }
}

customElements.define("app-list", List);
