import { show, decrement, increment } from "./src/basics.js";
import { crud } from "./src/crud.js";
import { address } from "./src/address.js";
import { createCarListItemsHtml } from "./src/app.js"; // Needed by VSC

window.add = () => {
  show(increment());
};

window.subtract = () => {
  show(decrement());
};

window.showAddress = async () => {
  /**
   * @type {crud<address>}
   */
  const addresses = new crud("http://localhost:3000/addresses");

  const address = await addresses.get(1);

  console.log(address);
  show(address.firstName);

  const listItems = await createCarListItemsHtml();
  const [nav] = document.getElementsByTagName("nav");

  nav.innerHTML = `<ul>${listItems}</ul>`;
};
