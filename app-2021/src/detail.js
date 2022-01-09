class Detail extends HTMLElement {
  /** @type List */
  list;

  /** @type crud<address> */
  crud;

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

    form.append(document.createElement("span")); // spacer in the first column
    form.append(saveButton);
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

  async save() {
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");

    this.#data.firstName = firstName.value;
    this.#data.lastName = lastName.value;

    await this.crud.update(this.#data);

    this.list.selected = this.#data;
  }
}

customElements.define("app-detail", Detail);
