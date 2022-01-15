import { Entity } from "./Metadata";

/**
 * Describes an object that performs CRUD for a given entity.
 */
export class Crud<T extends Entity> {
  /**
   * Creates a new object for the given `rootUrl`.
   *
   * @param {string} rootUrl The root URL to use.
   */
  constructor(rootUrl: string) {
    this.#_rootUrl = rootUrl;
  }

  timeOutInMilliseconds = 5000;

  getAll() {
    return this.#execute(this.#_rootUrl);
  }

  get(id: number) {
    return this.#execute(`${this.#_rootUrl}/${id}`);
  }

  insert(entity: Entity) {
    return this.#insertOrUpdate(`${this.#_rootUrl}/`, entity, "POST");
  }

  update(entity: Entity) {
    return this.#insertOrUpdate(`${this.#_rootUrl}/${entity.id}`, entity, "PUT");
  }

  delete(entity: Entity) {
    return this.#execute(`${this.#_rootUrl}/${entity.id}`, { method: "DELETE" });
  }

  save(entity: Entity) {
    if (entity.id) {
      return this.update(entity);
    }

    return this.insert(entity);
  }

  async #execute(url: string, init: RequestInit | undefined = undefined) {
    const response = await this.#fetchWithTimeout(url, init);

    if (!response.ok) {
      throw new Error(`Error [${response.status}] accessing [${url}]: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * @return {Promise<Response>}
   */
  #fetchWithTimeout = (url: string, { signal, ...options }: RequestInit = {}) => {
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
  #insertOrUpdate(url: string, entity: Entity, method: string) {
    return this.#execute(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entity),
    });
  }

  /**
   * @type {string}
   */
  readonly #_rootUrl;
}
