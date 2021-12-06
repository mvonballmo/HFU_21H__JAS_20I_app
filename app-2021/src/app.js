import { crud } from "./crud.js";

export async function createCarListItemsHtml() {
  /**
   * @type {crud<car>}
   */
  const cars = new crud("http://localhost:3001/cars");
  const allCars = await cars.getAll();

  const createListItem = car => {
    return `<li>${car.model}</li>`;
  };

  return allCars.map(createListItem).join("");
}
