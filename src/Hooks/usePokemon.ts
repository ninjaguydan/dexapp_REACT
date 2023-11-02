import { useEffect, useState } from "react";

import { IPokemon, ITeam } from "../utils/Interfaces";
import { setGen } from "../utils/setGen";
import { setPkmnType, setRelations } from "../utils/setPkmnType";
import useTypes from "./useTypes";

const usePokemon = (pkmnID: string = "1", teamArray: number[] = []) => {
  const { typeData, typeDataIsLoading } = useTypes();
  const [pkmnData, setPkmnData] = useState<IPokemon>({} as IPokemon);
  const [teamData, setTeamData] = useState<IPokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const promiseData: Promise<IPokemon>[] = [];

  useEffect(() => {
    if (typeDataIsLoading) {
      return;
    }
    const fetchPokemon = async (id: string) => {
      const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      const pokemon = await data.json();
      let tempPokemon = {
        id: pokemon["id"],
        name: pokemon["name"],
        gen: setGen(pokemon["id"]),
        types: setPkmnType(pokemon["types"]),
        sprite_url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        art_url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        hp: pokemon["stats"][0]["base_stat"],
        attack: pokemon["stats"][1]["base_stat"],
        defense: pokemon["stats"][2]["base_stat"],
        sp_attack: pokemon["stats"][3]["base_stat"],
        sp_defense: pokemon["stats"][4]["base_stat"],
        speed: pokemon["stats"][5]["base_stat"],
        favorited_by: [],
        weak_to: setRelations(setPkmnType(pokemon["types"]), typeData).weaknesses,
        resists: setRelations(setPkmnType(pokemon["types"]), typeData).resistances,
        immune_to: setRelations(setPkmnType(pokemon["types"]), typeData).immunities,
      };
      return tempPokemon;
    };
    if (teamArray.length !== 0) {
      teamArray.forEach(async (member) => promiseData.push(fetchPokemon(`${member}`)));
      Promise.all(promiseData).then((values) => {
        setTeamData(values);
        setIsLoading(false);
      });
    } else {
      fetchPokemon(pkmnID)
        .then((value) => {
          setPkmnData(value);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, [pkmnID, typeDataIsLoading]);

  return { pkmnData, teamData, isLoading };
};
export default usePokemon;
