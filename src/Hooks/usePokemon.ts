import { useEffect, useState } from "react";

import { IPokemon } from "../Helpers/Interfaces";
import { setGen } from "../Helpers/setGen";
import { setPkmnType } from "../Helpers/setPkmnType";

const usePokemon = (id: string = "1") => {
  const [pkmnData, setPkmnData] = useState<IPokemon>({} as IPokemon);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      const pokemon = await data.json();
      setPkmnData({
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
        weak_to: [],
        resists: [],
        immune_to: [],
      });
      setIsLoading(false);
    };
    fetchPokemon().catch((error) => {
      console.error(error.message);
    });
  }, [id]);

  return { pkmnData, isLoading };
};
export default usePokemon;
