import { Link } from "react-router-dom";

import TypeBtn from "components/common/buttons/TypeBtn";

import { IPokemon } from "utils/Interfaces";

type Props = {
  pokemon: IPokemon;
  classList?: string;
};

export default function PokemonCard({ pokemon, classList }: Props) {
  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      key={pokemon.id}
      className="bg-gray6 rounded-2xl hover:ring-2 hover:ring-gray3 p-3 sm:p-6 flex flex-col gap-y-2">
      <h3 className="capitalize text-center text-sm">{pokemon.name}</h3>
      <img
        src={pokemon.art_url}
        alt={`${pokemon.name}'s offical art`}
        className=" "
      />
      <div className="flex flex-col text-xs justify-center gap-2 mt-auto">
        {pokemon.types.map((type, i) => (
          <TypeBtn
            type={type}
            classList="max-w-full !p-1 font-normal leading-none"
          />
        ))}
      </div>
    </Link>
  );
}
