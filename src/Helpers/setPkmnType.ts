export function setPkmnType(
  pkmnTypeArr: [
    {
      slot: number;
      type: { name: string; url: string };
    }
  ]
): string[] {
  let types: string[] = [];
  pkmnTypeArr.forEach((obj) => types.push(obj.type.name));
  return types;
}
