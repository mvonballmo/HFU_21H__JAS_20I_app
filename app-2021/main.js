import { show, decrement, increment } from "./src/library.js";

window.add = () => {
  show(increment());
};

window.subtract = () => {
  show(decrement());
};
