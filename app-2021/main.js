import { crud } from "./src/crud.js";
import { address } from "./src/address.js"; // Needed by VSC

document.getElementById("showAddress").addEventListener("click", async () => {
  /**
   * @type {crud<address>}
   */
  const addresses = new crud("http://localhost:3000/addresses");

  const address = await addresses.get(1);

  console.log(address);
});

/**
 * @type {crud<address>}
 */
let addresses;

const listItems = document.getElementById("listItems");

window.addEventListener("load", async () => {
  /**
   * @type {crud<address>}
   */
  addresses = new crud("http://localhost:3000/addresses");

  try {
    listItems.innerHTML = "";
    for (const address of await addresses.getAll()) {
      listItems.innerHTML += `${address.firstName} ${address.lastName}<br>`;
    }
  } catch (e) {
    listItems.innerHTML = e.message;
  }
});
