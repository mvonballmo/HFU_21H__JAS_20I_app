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

  /**
   * Gets all entities from the database.
   *
   * @return Promise<[{ id: number }]>
   */
  getAll() {
    return this.#execute(this._rootUrl);
  }

  /**
   * Gets the entity with the given `id` from the database.
   *
   * @param {number} id The unique identifier for the requested entity.
   */
  get(id) {
    return this.#execute(`${this._rootUrl}/${id}`);
  }

  /**
   * Inserts the given `entity` into the database.
   *
   * @param {{}} entity The object to insert.
   * @return The inserted object with the ID applied.
   */
  insert(entity) {
    return this.#insertOrUpdate(`${this._rootUrl}/`, entity, "POST");
  }

  /**
   * Updates the given `entity` in the database.
   *
   * @param {{ id: number }} entity The object to update.
   */
  update(entity) {
    return this.#insertOrUpdate(`${this._rootUrl}/${entity.id}`, entity, "PUT");
  }

  /**
   * Deletes the given `entity` from the database.
   *
   * @param {{ id: number }} entity The object to delete.
   */
  delete(entity) {
    return fetch(`${this._rootUrl}/${entity.id}`, { method: "DELETE" });
  }

  async #execute(url, init = undefined) {
    const response = await fetch(url, init);

    return response.json();
  }

  #insertOrUpdate(url, address, method) {
    return this.#execute(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    });
  }

  /**
   * The root url to use for all entity commands.
   *
   * @type string
   */
  #_rootUrl;
}
