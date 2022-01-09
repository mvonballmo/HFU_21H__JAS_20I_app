class List extends HTMLElement {
  /** @type MasterDetail */
  master;

  #entities;

  #selected;

  get entities() {
    return this.#entities;
  }

  set entities(value) {
    this.#entities = value;
    this.#reloadList();
  }

  get selected() {
    return this.#selected;
  }

  set selected(value) {
    const currentlySelected = this.#getListItem(this.#selected);
    if (currentlySelected) {
      currentlySelected.className = "";
    }

    this.#selected = value;

    const listItem = this.#getListItem(value);
    if (listItem) {
      this.#configureListItem(listItem, value);
      listItem.className = "selected";
    } else {
      this.#reloadList();
    }
  }

  #getListItem(value) {
    return document.getElementById(this.#getListItemId(value));
  }

  addNew(value) {
    this.#entities.push(value);
    this.#addItem(value);
  }

  delete(value) {
    const itemInList = this.#entities.find(e => e.id === value.id);
    const index = this.#entities.indexOf(itemInList);

    if (index) {
      this.#entities.splice(index, 1);
    }

    if (this.#selected && this.#selected.id === itemInList.id) {
      if (index < this.#entities.length - 1) {
        this.selected = this.#entities[index + 1];
      } else if (index > 0) {
        this.selected = this.#entities[index - 1];
      }
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
    listItem.textContent = this.master.metadata.getTitle(entity);
  }

  #removeEventListeners(listItem) {
    // NOTE: This is a trick that results in removing all DOM modifications,
    // including event listeners.

    // eslint-disable-next-line no-self-assign
    listItem.innerHTML = listItem.innerHTML;
  }
}

customElements.define("app-list", List);
