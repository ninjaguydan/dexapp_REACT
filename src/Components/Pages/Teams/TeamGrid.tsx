import { Link } from "react-router-dom";

import PokemonCard from "components/common/cards/PokemonCard";
import Loading from "components/common/loader/Loading";

import placeholder from "media/0.png";

import { IPokemon } from "utils/Interfaces";

type Props = {
  team: IPokemon[];
  isLoading: boolean;
};

export default function TeamGrid({ team, isLoading }: Props) {
  return (
    <div className="bg-gray2 rounded border border-white border-opacity-10 border-solid p-4 grid grid-cols-2 gap-8 md:gap-6 sm:grid-cols-3">
      {team.map((pokemon) => {
        if (pokemon.id === 0) {
          return (
            <Link
              to={"/dexapp_REACT"}
              key={pokemon.id}>
              <img
                src={placeholder}
                alt="placeholder icon"
              />
            </Link>
          );
        } else {
          return (
            <>
              {() => {
                if (isLoading) return <Loading />;
              }}
              <PokemonCard pokemon={pokemon} />
            </>
          );
        }
      })}
    </div>
  );
}
