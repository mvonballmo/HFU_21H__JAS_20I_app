class Detail extends HTMLElement {
  /** @type MasterDetail */
  master;

  #entity;

  get entity() {
    return this.#entity;
  }

  set entity(value) {
    this.#entity = value;

    this.innerHTML = `
      <form>
        <label>First Name</label><input placeholder="First Name" required type="text" id="firstName" value="${value.firstName}">
        <label>Last Name</label><input placeholder="Last Name" required type="text" id="lastName" value="${value.lastName}">
      </form>
    `;

    const [form] = this.getElementsByTagName("form");

    const saveButton = this.#createSaveButton(form);
    const deleteButton = this.#createDeleteButton();

    form.append(document.createElement("span")); // spacer in the first column

    const buttonContainer = document.createElement("span");
    buttonContainer.append(saveButton);
    buttonContainer.append(deleteButton);
    form.append(buttonContainer);

    saveButton.disabled = !form.checkValidity();
    deleteButton.disabled = value.id === undefined;
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
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");

    this.#entity.firstName = firstName.value;
    this.#entity.lastName = lastName.value;

    return this.master.update(this.#entity);
  }

  async delete() {
    return this.master.delete(this.#entity);
  }
}

customElements.define("app-detail", Detail);
