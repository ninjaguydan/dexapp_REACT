import { Link } from "react-router-dom";

import TypeBtn from "components/common/buttons/TypeBtn";
import Loading from "components/common/loader/Loading";

import { IPokemon } from "utils/Interfaces";
import setImage from "utils/setDefaultImg";

type Props = {
  pokemon: IPokemon;
  isLoading: boolean;
  classList?: string;
};

export default function PokemonCard({ pokemon, classList, isLoading }: Props) {
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      key={pokemon.id}
      className="bg-gray6 rounded-2xl hover:ring-2 hover:ring-gray3 p-3 sm:p-6 flex flex-col gap-y-2">
      <h3 className="capitalize text-center text-sm">{pokemon.name}</h3>
      <img
        src={pokemon.art_url}
        alt={`${pokemon.name}'s offical art`}
        onError={(e) => {
          setImage(e);
        }}
      />
      <div className="flex flex-col text-xs justify-center gap-2 mt-auto">
        {pokemon.types.map((type, i) => (
          <TypeBtn
            key={type}
            type={type}
            classList="max-w-full !p-1 font-normal leading-none"
          />
        ))}
      </div>
    </Link>
  );
}