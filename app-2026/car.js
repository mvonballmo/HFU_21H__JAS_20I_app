export class Car {
  Make = "Volkswagen";
  Model = "Jetta";

  toJSON() {
    const { Make, ...rest } = this;
    return rest; // without "Make"
  }
}

