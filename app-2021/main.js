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

const log = e => {
  console.log(`${e.target.nodeName}, ${e.currentTarget.nodeName}`);
  e.stopPropagation();
};

document.addEventListener("click", log, { capture: true });

const containers = document.querySelectorAll(".buttons");
for (const container of containers) {
  container.addEventListener("click", log);
}

const buttons = document.getElementsByTagName("button");
for (const button of buttons) {
  button.addEventListener("click", log);
}

const duckDuckGo = document.getElementById("search");

duckDuckGo.addEventListener("click", e => {
  const shouldChangePage = confirm("Are you sure?");
  if (!shouldChangePage) {
    e.preventDefault();
  }
});
