const serverRoot = "http://localhost:3001/";

/**
 * Describes an object that performs CRUD for a given entity.
 */
export class crud {
  /**
   * Creates a new object for the given `rootUrl`.
   *
   * @param {string} rootUrl The root URL to use.
   */
  constructor(rootUrl) {
    this._rootUrl = rootUrl;
  }

  get getRootUrl() {
    return this._rootUrl;
  }

  /**
   * Gets all entities from the database.
   */
  getAll() {
    return execute(getAddressesUrl());
  }

  /**
   * Gets the entity with the given `id` from the database.
   *
   * @param {number} id The unique identifier for the requested entity.
   */
  get(id) {
    return execute(`${getAddressesUrl()}/${id}`);
  }

  /**
   * Inserts the given `entity` into the database.
   *
   * @param {{}} entity The object to insert.
   * @return The inserted object with the ID applied.
   */
  insert(entity) {
    return insertOrUpdate(`${getAddressesUrl()}/`, entity, "POST");
  }

  /**
   * Updates the given `entity` in the database.
   *
   * @param {{ id: number }} entity The object to update.
   */
  update(entity) {
    return insertOrUpdate(`${getAddressesUrl()}/${entity.id}`, entity, "PUT");
  }

  /**
   * Deletes the given `entity` from the database.
   *
   * @param {{ id: number }} entity The object to delete.
   */
  delete(entity) {
    return fetch(`${getAddressesUrl()}/${entity.id}`, { method: "DELETE" });
  }

  /**
   * The root url to use for all entity commands.
   *
   * @private
   */
  #_rootUrl;
}

async function execute(url, init = undefined) {
  const response = await fetch(url, init);

  return response.json();
}

function insertOrUpdate(url, address, method) {
  return execute(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  });
}

export function getAddressesUrl() {
  return `${serverRoot}addresses`;
}

export function getAddresses() {
  return execute(getAddressesUrl());
}

export function getAddress(id) {
  return execute(`${getAddressesUrl()}/${id}`);
}

export function insertAddress(address) {
  return insertOrUpdate(`${getAddressesUrl()}/`, address, "POST");
}

export function updateAddress(address) {
  return insertOrUpdate(`${getAddressesUrl()}/${address.id}`, address, "PUT");
}

export function deleteAddress(address) {
  return fetch(`${getAddressesUrl()}/${address.id}`, { method: "DELETE" });
}

export function getCars() {
  return execute(`${serverRoot}cars`);
}

/**
 * Gets an object that performs CRUD for addresses.
 *
 * @return {crud}
 */
export function createAddressCrud() {
  return new crud("http://localhost:3001/addresses");
}
