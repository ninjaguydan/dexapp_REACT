import { useEffect, useState } from "react";

import { IType } from "../Helpers/Interfaces";
import { TYPES } from "../data/typeManager";

const useTypes = () => {
  const [typeDataIsLoading, setTypeDataIsLoading] = useState(true);
  const [typeData, setTypeData] = useState<IType[]>([]);
  const promiseData: Promise<IType>[] = [];

  useEffect(() => {
    const fetchTypeData = async (id: number) => {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${id}/`);
      const json = await response.json();
      let tempType: IType = {
        id: id,
        name: json["name"],
        weak_to: [],
        resists: [],
        immune_to: [],
      };
      // set weaknesses if they exist
      if (json["damage_relations"]["double_damage_from"]) {
        for (let weakness of json["damage_relations"]["double_damage_from"]) {
          tempType.weak_to.push(weakness.name);
        }
      }
      // set resistances if they exist
      if (json["damage_relations"]["half_damage_from"]) {
        for (let resistance of json["damage_relations"]["half_damage_from"]) {
          tempType.resists.push(resistance.name);
        }
      }
      // set immunities if they exist
      if (json["damage_relations"]["no_damage_from"]) {
        for (let immunity of json["damage_relations"]["no_damage_from"]) {
          tempType.immune_to.push(immunity.name);
        }
      }
      return tempType;
    };

    TYPES.forEach(async (type, index) => promiseData.push(fetchTypeData(index + 1)));

    Promise.all(promiseData).then((values) => {
      setTypeData(values);
      setTypeDataIsLoading(false);
    });
  }, []);

  return { typeData, typeDataIsLoading };
};
export default useTypes;
