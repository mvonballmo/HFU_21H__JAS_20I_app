import { crud } from "./crud.js";

export class application {
  /**
   * @type {crud<address>}
   */
  addresses;

  constructor(rootUrl) {
    this.addresses = new crud(`${rootUrl}addresses`);
  }

  initialize = () => {
    return this.#reloadList();
  };

  async #reloadList() {
    const listItems = document.getElementById("listItems");

    try {
      listItems.innerHTML = "";
      let addresses = await this.addresses.getAll();
      for (const address of addresses) {
        const link = document.createElement("a");
        link.href = "#";
        link.id = this.#getListItemId(address);
        this.#configureListItem(link, address);

        const div = document.createElement("div");
        div.appendChild(link);

        listItems.appendChild(div);
      }

      this.#showDetail(addresses[0]);
    } catch (e) {
      listItems.innerHTML = e.message;
    }
  }

  #configureListItem(listItem, address) {
    const application = this;
    this.#removeEventListeners(listItem);

    listItem.addEventListener("click", () => application.#showDetail(address));
    listItem.textContent = `${address.firstName} ${address.lastName}`;
  }

  #removeEventListeners(listItem) {
    // NOTE: This is a trick that results in removing all DOM modifications,
    // including event listeners.

    // eslint-disable-next-line no-self-assign
    listItem.innerHTML = listItem.innerHTML;
  }

  #getListItemId(address) {
    return `list_item_${address.id}`;
  }

  /**
   * @param {address} address
   */
  #showDetail(address) {
    const detail = document.getElementById("detail");
    const application = this;

    detail.innerHTML = `
      <form>
        <label>First Name</label><input placeholder="First Name" required type="text" id="firstName" value="${address.firstName}">
        <label>Last Name</label><input placeholder="Last Name" required type="text" id="lastName" value="${address.lastName}">
      </form>
    `;

    const saveButton = document.createElement("button");
    saveButton.id = "save";
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", async e => {
      await application.saveDetail(address);
      e.preventDefault();
    });

    const [form] = detail.getElementsByTagName("form");

    const inputs = form.getElementsByTagName("input");

    for (const input of inputs) {
      input.addEventListener("input", e => {
        saveButton.disabled = !e.target.checkValidity();
      });
    }

    form.append(document.createElement("span")); // spacer in the first column
    form.append(saveButton);
  }

  /**
   * @param {address} address
   */
  async saveDetail(address) {
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");

    address.firstName = firstName.value;
    address.lastName = lastName.value;

    await this.addresses.update(address);

    const listItem = document.getElementById(this.#getListItemId(address));
    if (listItem) {
      this.#configureListItem(listItem, address);
    } else {
      return this.#reloadList();
    }
  }
}
