// Get basic info for given pokemon

import { PKMN_API } from "api/urls";
import useSWR from "swr";
import { IPokemon, PKMN_JSON } from "utils/Interfaces";
import { setGen } from "utils/setGen";
import { setPkmnType } from "utils/setPkmnType";

async function fetchPkmn(url: string): Promise<IPokemon | undefined> {
  let pkmn: IPokemon | undefined = undefined;

  try {
    const response: Response = await fetch(url);
    if (response.ok) {
      const json: PKMN_JSON = await response.json();
      pkmn = {
        id: json.id,
        name: json.name,
        gen: setGen(json.id),
        types: setPkmnType(json.types),
        sprite_url: json.sprites.front_default,
        art_url: json.sprites.other["official-artwork"].front_default,
        shiny_url: json.sprites.other["official-artwork"].front_shiny,
        hp: json.stats[0].base_stat,
        attack: json.stats[1].base_stat,
        defense: json.stats[2].base_stat,
        sp_attack: json.stats[3].base_stat,
        sp_defense: json.stats[4].base_stat,
        speed: json.stats[5].base_stat,
        favorited_by: [],
        weak_to: [],
        resists: [],
        immune_to: [],
      };
    }
  } catch (error: any) {
    throw error;
  }
  return pkmn;
}

export default function useFetchPkmn(id: number) {
  const { data, error, isLoading } = useSWR(PKMN_API + `/${id}`, fetchPkmn);

  return { isLoading, data };
}
