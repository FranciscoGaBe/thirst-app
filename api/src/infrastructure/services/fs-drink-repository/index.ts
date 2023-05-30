import { DrinkRepository } from "../../../domain/drink.repository";
import { getAllDrinks } from "./getAllDrinks";
import { getDrinkById } from "./getDrinkById";
import { updateDrink } from "./updateDrink";

export const FSDrinkRepositoryService: DrinkRepository = {
  getAll: getAllDrinks,
  getById: getDrinkById,
  update: updateDrink
}