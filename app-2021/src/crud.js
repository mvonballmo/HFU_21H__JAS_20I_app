/** @type {import('./crud')} */
// Use JSDOC above to be able to use the type definitions in this file as well

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
    this.#_rootUrl = rootUrl;
  }

  timeOutInMilliseconds = 5000;

  /**
   * Gets all entities from the database.
   */
  getAll() {
    return this.#execute(this.#_rootUrl);
  }

  /**
   * Gets the entity with the given `id` from the database.
   *
   * @param {number} id The unique identifier for the requested entity.
   */
  get(id) {
    return this.#execute(`${this.#_rootUrl}/${id}`);
  }

  /**
   * Inserts the given `entity` into the database.
   *
   * @param {{}} entity The object to insert.
   */
  insert(entity) {
    return this.#insertOrUpdate(`${this.#_rootUrl}/`, entity, "POST");
  }

  /**
   * Updates the given `entity` in the database.
   *
   * @param {{ id: number }} entity The object to update.
   */
  update(entity) {
    return this.#insertOrUpdate(`${this.#_rootUrl}/${entity.id}`, entity, "PUT");
  }

  /**
   * Deletes the given `entity` from the database.
   *
   * @param {{ id: number }} entity The object to delete.
   */
  delete(entity) {
    return this.#execute(`${this.#_rootUrl}/${entity.id}`, { method: "DELETE" });
  }

  /**
   * @param {string} url
   * @param {RequestInit} init
   */
  async #execute(url, init = undefined) {
    const response = await this.#fetchWithTimeout(url, init);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}, ${response.statusText}`);
    }

    return response.json();
  }

  /**
   *
   * @return {Promise<Response>}
   */
  #fetchWithTimeout = (url, { signal, ...options } = {}) => {
    const controller = new AbortController();
    const response = fetch(url, { signal: controller.signal, ...options });

    if (signal) {
      signal.addEventListener("abort", () => controller.abort());
    }
    const timeout = setTimeout(() => controller.abort(), this.timeOutInMilliseconds);

    return response.finally(() => clearTimeout(timeout));
  };

  /**
   * @param {string} url
   * @param {{}} entity
   * @param {string} method
   */
  #insertOrUpdate(url, entity, method) {
    return this.#execute(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entity),
    });
  }

  #_rootUrl;
}
