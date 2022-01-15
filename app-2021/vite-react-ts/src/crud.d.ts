export class Crud<T extends { id: number }> {
  /**
   * Creates a new crud object for type `T`
   * @param rootUrl The URL to use to retrieve data.
   */
  constructor(rootUrl: string);

  /**
   * The number of milliseconds to wait for a response before aborting.
   */
  timeOutInMilliseconds: number;

  /**
   * Gets all entities of type `T` from the database.
   */
  getAll(): Promise<[T]>;

  /**
   * Gets the entity with the given `id` from the database.
   */
  get(id: number): Promise<T>;

  /**
   * Inserts the given `entity` into the database.
   */
  insert(entity: T): Promise<T>;

  /**
   * Updates the given `entity` in the database.
   */
  update(entity: T): Promise<T>;

  /**
   * Deletes the given `entity` from the database.
   */
  delete(entity: T): Promise<Response>;
}
