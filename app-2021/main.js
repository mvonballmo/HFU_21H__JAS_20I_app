import { crud } from "./src/crud.js";
import { address } from "./src/address.js";
import { application } from "./src/app.js";

document.getElementById("showAddress").addEventListener("click", async () => {
  /**
   * @type {crud<address>}
   */
  const addresses = new crud("http://localhost:3000/addresses");

  const address = await addresses.get(1);

  console.log(address);
});

const app = new application();

window.addEventListener("load", async () => {
  const listItems = document.getElementById("listItems");
  await app.initialize(listItems);
});
