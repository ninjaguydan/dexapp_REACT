import { useEffect, useState } from "react";
import usePokemon from "./fetchers/usePokemon";
import { getBaseStatTotal } from "../utils/Helpers";
import { IRTable, ISTable } from "../utils/Interfaces";

const useTeam = (teamArray: number[]) => {
  const { teamData, isLoading } = usePokemon("", teamArray);
  const [loadingSummary, setLoadinSummary] = useState(true);
  const [resistanceTable, setResistanceTable] = useState<IRTable>({});
  const [statTable, setStatTable] = useState<ISTable>({
    "Base Stat Total Avg": 0,
    "Avg HP": 0,
    "Avg Attack": 0,
    "Avg Defense": 0,
    "Avg Special Attack": 0,
    "Avg Special Defense": 0,
    "Avg Speed": 0,
  });

  useEffect(() => {
    setResistanceTable({
      normal: { weak: 0, resist: 0, immune: 0 },
      fighting: { weak: 0, resist: 0, immune: 0 },
      flying: { weak: 0, resist: 0, immune: 0 },
      poison: { weak: 0, resist: 0, immune: 0 },
      ground: { weak: 0, resist: 0, immune: 0 },
      rock: { weak: 0, resist: 0, immune: 0 },
      bug: { weak: 0, resist: 0, immune: 0 },
      ghost: { weak: 0, resist: 0, immune: 0 },
      steel: { weak: 0, resist: 0, immune: 0 },
      fire: { weak: 0, resist: 0, immune: 0 },
      water: { weak: 0, resist: 0, immune: 0 },
      grass: { weak: 0, resist: 0, immune: 0 },
      electric: { weak: 0, resist: 0, immune: 0 },
      psychic: { weak: 0, resist: 0, immune: 0 },
      ice: { weak: 0, resist: 0, immune: 0 },
      dragon: { weak: 0, resist: 0, immune: 0 },
      dark: { weak: 0, resist: 0, immune: 0 },
      fairy: { weak: 0, resist: 0, immune: 0 },
    });

    let base_total = 0;
    let hp_total = 0;
    let atk_total = 0;
    let def_total = 0;
    let spatk_total = 0;
    let spdef_total = 0;
    let spd_total = 0;

    teamData.forEach((pokemon) => {
      base_total += getBaseStatTotal([
        pokemon.hp,
        pokemon.attack,
        pokemon.defense,
        pokemon.sp_attack,
        pokemon.sp_defense,
        pokemon.speed,
      ]);
      hp_total += pokemon.hp;
      atk_total += pokemon.attack;
      def_total += pokemon.defense;
      spatk_total += pokemon.sp_attack;
      spdef_total += pokemon.sp_defense;
      spd_total += pokemon.speed;
      for (let weakness of pokemon.weak_to) {
        setResistanceTable({
          ...resistanceTable,
          [weakness]: {
            ...resistanceTable[weakness],
            weak: (resistanceTable[weakness].weak += 1),
          },
        } as IRTable);
      }
      for (let resistance of pokemon.resists) {
        setResistanceTable({
          ...resistanceTable,
          [resistance]: {
            ...resistanceTable[resistance],
            resist: (resistanceTable[resistance].resist += 1),
          },
        } as IRTable);
      }
      for (let immunity of pokemon.immune_to) {
        setResistanceTable({
          ...resistanceTable,
          [immunity]: {
            ...resistanceTable[immunity],
            immune: (resistanceTable[immunity].immune += 1),
          },
        } as IRTable);
      }
    });
    setStatTable({
      "Base Stat Total Avg": Math.floor(base_total / 6),
      "Avg HP": Math.floor(hp_total / 6),
      "Avg Attack": Math.floor(atk_total / 6),
      "Avg Defense": Math.floor(def_total / 6),
      "Avg Special Attack": Math.floor(spatk_total / 6),
      "Avg Special Defense": Math.floor(spdef_total / 6),
      "Avg Speed": Math.floor(spd_total / 6),
    });

    setLoadinSummary(false);
  }, [isLoading, teamArray]);

  return { summary: { teamData, resistanceTable, statTable }, loadingSummary };
};
export default useTeam;
