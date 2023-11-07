import { useEffect, useState } from "react";

import placeholder from "media/0.png";

import { IPokemon } from "utils/Interfaces";

type Props = {
  pokemon: IPokemon;
  classList?: string;
};

function toggleImage(
  option1: string,
  option2: string,
  state: string,
  action: React.Dispatch<React.SetStateAction<string>>
): void {
  switch (state) {
    case option1:
      action(option2);
      return;
    default:
      action(option1);
      return;
  }
}

export default function PokemonAvatar({ pokemon, classList }: Props) {
  const [currentImg, setCurrentImg] = useState(pokemon.art_url);

  useEffect(() => {
    setCurrentImg(pokemon.art_url);
  }, [pokemon]);

  return (
    <button
      className="w-40 sm:w-3/5 lg:w-4/5"
      onClick={() => {
        toggleImage(pokemon.art_url, pokemon.shiny_url, currentImg, setCurrentImg);
      }}>
      <img
        src={currentImg || placeholder}
        alt={`${pokemon.name}'s official artwork`}
        className=""
      />
    </button>
  );
}
