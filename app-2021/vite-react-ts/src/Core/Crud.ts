import { Entity } from "./Metadata";

/**
 * Describes an object that performs CRUD for a given entity.
 */
export class Crud<T extends Entity> {
  constructor(rootUrl: string) {
    this.#_rootUrl = rootUrl;
  }

  timeOutInMilliseconds = 5000;

  getAll(): Promise<T[]> {
    return this.#execute(this.#_rootUrl);
  }

  get(id: number): Promise<T> {
    return this.#execute(`${this.#_rootUrl}/${id}`);
  }

  insert(entity: T): Promise<T> {
    return this.#insertOrUpdate(`${this.#_rootUrl}/`, entity, "POST");
  }

  update(entity: T): Promise<T> {
    return this.#insertOrUpdate(`${this.#_rootUrl}/${entity.id}`, entity, "PUT");
  }

  delete(entity: T): Promise<T> {
    return this.#execute(`${this.#_rootUrl}/${entity.id}`, { method: "DELETE" });
  }

  save(entity: T): Promise<T> {
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

  #fetchWithTimeout = (url: string, { signal, ...options }: RequestInit = {}) => {
    const controller = new AbortController();
    const response = fetch(url, { signal: controller.signal, ...options });

    if (signal) {
      signal.addEventListener("abort", () => controller.abort());
    }
    const timeout = setTimeout(() => controller.abort(), this.timeOutInMilliseconds);

    return response.finally(() => clearTimeout(timeout));
  };

  #insertOrUpdate(url: string, entity: Entity, method: string) {
    return this.#execute(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entity),
    });
  }

  readonly #_rootUrl: string;
}
