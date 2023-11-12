import PokemonCard from "components/common/posts/PokemonCard";

import placeholder from "media/0.png";

import { IPokemon } from "utils/Interfaces";

type Props = {
  team: number[];
};

export default function TeamGrid({ team }: Props) {
  const arr = [...Array(6).keys()];

  return (
    <div className="bg-gray2 rounded border border-white border-opacity-10 border-solid p-4 grid grid-cols-2 gap-8 md:gap-6 sm:grid-cols-3">
      {arr.map((index) => {
        if (index < team.length) {
          return (
            <PokemonCard
              key={index}
              pokemon_id={team[index]}
            />
          );
        } else {
          return (
            <div
              key={index}
              className="bg-gray6 rounded-2xl flex items-center justify-center">
              <img
                src={placeholder}
                alt="placeholder"
              />
            </div>
          );
        }
      })}
    </div>
  );
}
