import { Address } from "./Address";

/**
 * Gets an array of all entities from the database.
 *
 * @return {Promise<[Address]>} Array of all entities
 */
export async function getAddresses() {
  const response = await fetch("http://localhost:3000/addresses");
  if (response.ok) {
    return await response.json();
  }

  throw `Response was ${response.statusText}.`;
}
