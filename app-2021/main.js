import { show, decrement, increment } from "./src/basics.js";

window.add = () => {
  show(increment());
};

window.subtract = () => {
  show(decrement());
};
