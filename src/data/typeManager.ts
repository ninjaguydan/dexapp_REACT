import { IRTable } from "../Helpers/Interfaces";

export const TYPES = [
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
];

export const rTable: IRTable = {};

TYPES.forEach((type) => {
  rTable[type] = { weak: 0, resist: 0, immune: 0 };
});
