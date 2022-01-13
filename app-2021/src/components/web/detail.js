class Detail extends HTMLElement {
  /** @type MasterDetail */
  master;

  #entity;

  get entity() {
    return this.#entity;
  }

  set entity(value) {
    this.#entity = value;

    const form = document.createElement("form");

    for (const property of this.master.metadata.properties) {
      const label = document.createElement("label");
      label.textContent = property.caption;
      const input = document.createElement("input");
      input.id = property.name;
      input.type = property.type;
      input.required = true;
      input.placeholder = property.caption;
      input.value = value[property.name];

      form.append(label, input);
    }

    const saveButton = this.#createSaveButton(form);
    const deleteButton = this.#createDeleteButton();

    form.append(document.createElement("span")); // spacer in the first column

    const buttonContainer = document.createElement("span");
    buttonContainer.append(saveButton);
    buttonContainer.append(deleteButton);
    form.append(buttonContainer);

    saveButton.disabled = !form.checkValidity();
    deleteButton.disabled = value.id === undefined;

    this.innerHTML = "";
    this.append(form);
  }

  /**
   * @param {HTMLFormElement} form
   */
  #createSaveButton(form) {
    const button = document.createElement("button");
    button.id = "save";
    button.textContent = "Save";

    const self = this;
    button.addEventListener("click", async e => {
      await self.save();
      e.preventDefault();
    });

    const inputs = form.getElementsByTagName("input");

    for (const input of inputs) {
      input.addEventListener("input", e => {
        button.disabled = !e.target.form.checkValidity();
      });
    }
    return button;
  }

  #createDeleteButton() {
    const button = document.createElement("button");
    button.id = "delete";
    button.textContent = "Delete";

    const self = this;
    button.addEventListener("click", async e => {
      await self.delete();
      e.preventDefault();
    });

    return button;
  }

  async save() {
    for (const property of this.master.metadata.properties) {
      const name = property.name;
      this.#entity[name] = document.getElementById(name).value;
    }

    return this.master.update(this.#entity);
  }

  async delete() {
    return this.master.delete(this.#entity);
  }
}

customElements.define("app-detail", Detail);
