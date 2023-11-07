import { IType } from "./Interfaces";

export function setRelations(types: string[], typeData: IType[]) {
  let type1 = typeData.find((type) => types[0] === type.name)!;
  let weaknesses = [];
  let resistances = [];
  let immunities = [];

  //add all of type1's weaknesses to Pokemon's weaknesses
  for (let weakness of type1.weak_to) {
    weaknesses.push(weakness);
  }

  //add all of type1's resistances to Pokemon's weaknesses
  for (let resistance of type1.resists) {
    resistances.push(resistance);
  }

  //add all of type1's immunites to Pokemon's immunities
  for (let immuniy of type1.immune_to) {
    immunities.push(immuniy);
  }

  //if a second type exists...
  if (types.length === 2) {
    let type2 = typeData.find((type) => types[1] === type.name)!;

    for (let weakness of type2.weak_to) {
      // if type2's weakness is in resistances[], remove the resistance
      if (resistances.includes(weakness)) {
        resistances = resistances.filter((resistance) => resistance !== weakness);
      } // if type2's weakness isn't in immunities[], and the weakness is not already there, add weakness to weaknesses[]
      else if (!immunities.includes(weakness) && !weaknesses.includes(weakness)) {
        weaknesses.push(weakness);
      }
    }

    for (let resistance of type2.resists) {
      //if type2's resistance is in weaknesses[], remove the weakness
      if (weaknesses.includes(resistance)) {
        weaknesses = weaknesses.filter((weakness) => weakness !== resistance);
      } // if type2's resistance is not in weaknesses[], and the resistance is not already there, add resistance to resistances[]
      else if (!weaknesses.includes(resistance) && !resistances.includes(resistance)) {
        resistances.push(resistance);
      }
    }

    for (let immunity of type2.immune_to) {
      //if type2 immunity in weaknesses[], remove the weakness and add it to immunities[]
      if (weaknesses.includes(immunity)) {
        weaknesses = weaknesses.filter((weakness) => weakness !== immunity);
        immunities.push(immunity);
      } // if type2 immunity in resistances[], remove the resistance and add it to immunities[]
      else if (resistances.includes(immunity)) {
        resistances = resistances.filter((resistance) => resistance !== immunity);
        immunities.push(immunity);
      } else {
        immunities.push(immunity);
      }
    }
  }

  return { weaknesses, resistances, immunities };
}
