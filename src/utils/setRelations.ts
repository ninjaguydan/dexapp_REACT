import { IType, PKMN_JSON, TYPE_JSON } from "./Interfaces";

export function setRelations(types: string[], typeData: TYPE_JSON[]) {
  let type1 = typeData.find((type) => types[0] === type.name)!;
  let weaknesses = [];
  let resistances = [];
  let immunities = [];

  //add all of type1's weaknesses to Pokemon's weaknesses
  for (let weakness of type1.damage_relations.double_damage_from) {
    weaknesses.push(weakness.name);
  }

  //add all of type1's resistances to Pokemon's weaknesses
  for (let resistance of type1.damage_relations.half_damage_from) {
    resistances.push(resistance.name);
  }

  //add all of type1's immunites to Pokemon's immunities
  for (let immuniy of type1.damage_relations.no_damage_from) {
    immunities.push(immuniy.name);
  }

  //if a second type exists...
  if (types[1]) {
    let type2 = typeData.find((type) => types[1] === type.name)!;

    for (let weakness of type2.damage_relations.double_damage_from) {
      // if type2's weakness is in resistances[], remove the resistance
      if (resistances.includes(weakness.name)) {
        resistances = resistances.filter((resistance) => resistance !== weakness.name);
      } // if type2's weakness isn't in immunities[], and the weakness is not already there, add weakness to weaknesses[]
      else if (!immunities.includes(weakness.name) && !weaknesses.includes(weakness.name)) {
        weaknesses.push(weakness.name);
      }
    }

    for (let resistance of type2.damage_relations.half_damage_from) {
      //if type2's resistance is in weaknesses[], remove the weakness
      if (weaknesses.includes(resistance.name)) {
        weaknesses = weaknesses.filter((weakness) => weakness !== resistance.name);
      } // if type2's resistance is not in weaknesses[], and the resistance is not already there, add resistance to resistances[]
      else if (!weaknesses.includes(resistance.name) && !resistances.includes(resistance.name)) {
        resistances.push(resistance.name);
      }
    }

    for (let immunity of type2.damage_relations.no_damage_from) {
      //if type2 immunity in weaknesses[], remove the weakness and add it to immunities[]
      if (weaknesses.includes(immunity.name)) {
        weaknesses = weaknesses.filter((weakness) => weakness !== immunity.name);
        immunities.push(immunity.name);
      } // if type2 immunity in resistances[], remove the resistance and add it to immunities[]
      else if (resistances.includes(immunity.name)) {
        resistances = resistances.filter((resistance) => resistance !== immunity.name);
        immunities.push(immunity.name);
      } else {
        immunities.push(immunity.name);
      }
    }
  }

  return { weaknesses, resistances, immunities };
}
