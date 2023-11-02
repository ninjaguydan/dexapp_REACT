import { Link } from "react-router-dom";

import { IPokemon } from "utils/Interfaces";
import placeholder from "media/0.png";

export default function TeamGrid({ team }: { team: IPokemon[] }) {
  return (
    <div className="card team-grid">
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
            <Link
              to={`/pokemon/${pokemon.id}`}
              key={pokemon.id}>
              <img
                src={pokemon.art_url}
                alt={`${pokemon.name}'s offical art`}
              />
              <div className="type-container">
                {pokemon.types.map((type, i) => (
                  <span
                    key={i}
                    className={`type ${type}`}>
                    {type}
                  </span>
                ))}
              </div>
            </Link>
          );
        }
      })}
    </div>
  );
}
