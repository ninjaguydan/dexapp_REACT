import { Link } from "react-router-dom";

import TypeBtn from "components/common/buttons/TypeBtn";
import { IPokemon } from "utils/Interfaces";
import placeholder from "media/0.png";
import Loading from "components/common/loader/Loading";

type Props = {
  team: IPokemon[];
  isLoading: boolean;
};

export default function TeamGrid({ team, isLoading }: Props) {
  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <div className="bg-gray2 rounded border border-white border-opacity-10 border-solid p-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
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
              <Link
                to={`/pokemon/${pokemon.id}`}
                key={pokemon.id}
                className="">
                <img
                  src={pokemon.art_url}
                  alt={`${pokemon.name}'s offical art`}
                  className="bg-gray6 rounded-2xl hover:ring-2 hover:ring-gray3"
                />
                <div className="flex flex-col text-xs xsm:flex-row sm:flex-col justify-center gap-2 py-2">
                  {pokemon.types.map((type, i) => (
                    <TypeBtn type={type} />
                  ))}
                </div>
              </Link>
            </>
          );
        }
      })}
    </div>
  );
}
