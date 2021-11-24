import { show, decrement, increment } from "./library.js";

window.add = () => {
  show(increment());
};

window.subtract = () => {
  show(decrement());
};
