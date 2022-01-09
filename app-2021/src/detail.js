class Detail extends HTMLElement {
  /** @type MasterDetail */
  master;

  /** @type address */
  #data;

  /** @return address */
  get data() {
    return this.#data;
  }

  /**
   * @param {address} value
   */
  set data(value) {
    this.#data = value;

    this.innerHTML = `
      <form>
        <label>First Name</label><input placeholder="First Name" required type="text" id="firstName" value="${value.firstName}">
        <label>Last Name</label><input placeholder="Last Name" required type="text" id="lastName" value="${value.lastName}">
      </form>
    `;

    const [form] = this.getElementsByTagName("form");

    const saveButton = this.#createSaveButton(value, form);
    const deleteButton = this.#createDeleteButton();

    form.append(document.createElement("span")); // spacer in the first column

    const buttonContainer = document.createElement("span");
    buttonContainer.append(saveButton);
    buttonContainer.append(deleteButton);
    form.append(buttonContainer);
  }

  /**
   * @param {address} value
   * @param {HTMLFormElement} form
   */
  #createSaveButton(value, form) {
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
        button.disabled = !e.target.checkValidity();
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

    this.#data.firstName = firstName.value;
    this.#data.lastName = lastName.value;

    return this.master.update(this.#data);
  }

  async delete() {
    return this.master.delete(this.#data);
  }
}

customElements.define("app-detail", Detail);
