import { useEffect, useState } from "react";

import { PKMN_API } from "api/urls";

import useTypes from "hooks/useTypes";

import { IPokemon, ITeam } from "utils/Interfaces";
import { setGen } from "utils/setGen";
import { setPkmnType } from "utils/setPkmnType";
import { setRelations } from "utils/setRelations";

interface PKMN_JSON {
  id: number;
  name: string;
  types: { slot: number; type: { name: string; url: string } }[];
  stats: { base_stat: number; effort: number; stat: { name: string; url: string } }[];
  sprites: {
    front_default: string;
    front_shiny: string;
    [key: string]: any;
    other: { "official-artwork": { front_default: string; front_shiny: string }; [key: string]: any };
  };
  [key: string]: any;
}

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
      const response: Response = await fetch(PKMN_API + `/${id}`);
      const data: PKMN_JSON = await response.json();

      let tempPokemon: IPokemon = {
        id: data.id,
        name: data.name,
        gen: setGen(data.id),
        types: setPkmnType(data.types),
        sprite_url: data.sprites.front_default,
        art_url: data.sprites.other["official-artwork"].front_default,
        shiny_url: data.sprites.other["official-artwork"].front_shiny,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        sp_attack: data.stats[3].base_stat,
        sp_defense: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
        favorited_by: [],
        weak_to: setRelations(setPkmnType(data.types), typeData).weaknesses,
        resists: setRelations(setPkmnType(data.types), typeData).resistances,
        immune_to: setRelations(setPkmnType(data.types), typeData).immunities,
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
