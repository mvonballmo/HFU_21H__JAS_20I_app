export class crud<T extends { id: number }> {
  constructor(rootUrl: string);

  timeOutInMilliseconds: number;

  getAll(): Promise<[T]>;

  get(id: number): Promise<T>;

  insert(entity: T): Promise<T>;

  update(entity: T): Promise<T>;

  delete(entity: T): Promise<Response>;

  #_rootUrl: string;
}
