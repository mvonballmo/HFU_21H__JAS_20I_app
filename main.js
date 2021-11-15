import * as library from './library.js';

window.add = () => {
  library.show(library.increment())
};

window.subtract = () => {
  library.show(library.decrement())
};
