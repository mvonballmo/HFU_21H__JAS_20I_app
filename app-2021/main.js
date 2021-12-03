import { show, decrement, increment } from "./src/basics.js";
import { crud } from "./src/crud.js";

window.add = () => {
  show(increment());
};

window.subtract = () => {
  show(decrement());
};

window.showAddress = async () => {
  /**
   * @type {crud<{id: number, firstName: string, lastName: string}>}
   */
  const addresses = new crud("http://localhost:3000/addresses");

  const address = await addresses.get(1);

  console.log(address);
  show(address.firstName);
};
