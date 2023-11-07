interface pokemonAPITypes {
  slot: number;
  type: { name: string; url: string };
}

export function setPkmnType(pkmnTypeArr: pokemonAPITypes[]): string[] {
  let types: string[] = [];
  pkmnTypeArr.forEach((obj) => types.push(obj.type.name));
  return types;
}
