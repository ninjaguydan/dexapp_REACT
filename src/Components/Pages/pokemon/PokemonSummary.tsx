import { useSelector } from "react-redux";
import { FaStar, FaHeart } from "react-icons/fa";
import { RootState } from "redux/store";

import TypeBtn from "components/common/buttons/TypeBtn";
import PokemonAvatar from "components/common/buttons/PokemonAvatar";
import PokeNavBtn from "components/common/buttons/PokeNavBtn";
import AddToTeam from "components/common/modals/AddToTeam";

import ListItem from "components/modules/ListItem";

import { IPokemon } from "utils/Interfaces";
import { makeHundreds, getBaseStatTotal } from "utils/Helpers";
import Button from "components/modules/Button";
import { useState } from "react";

interface Props {
  pokemon: IPokemon;
}
function setNav(pokemonId: number) {
  let nav = { prev: 0, next: 0 };
  pokemonId === 1 ? (nav.prev = 1010) : (nav.prev = pokemonId - 1);
  pokemonId === 1010 ? (nav.next = 1) : (nav.next = pokemonId + 1);
  return nav;
}

export default function PokemonSummary({ pokemon }: Props) {
  const [showAddToTeam, setShowAddToTeam] = useState(false);
  const currentUser = useSelector((state: RootState) => state.loggedUser);
  const reviewCnt = useSelector((state: RootState) => state.reviews.filter((review) => review.pkmn === pokemon.id).length);
  const stats: { [key: string]: number } = {
    HP: pokemon.hp,
    Attack: pokemon.attack,
    Defense: pokemon.defense,
    "Special Attack": pokemon.sp_attack,
    "Special Defense": pokemon.sp_defense,
    Speed: pokemon.speed,
  };

  return (
    <ul className="sm:min-w-[30%] group relative bg-gray2 rounded border border-white border-opacity-10 border-solid [&_li:nth-child(even)]:bg-gray6">
      <ListItem classList="flex flex-col items-center text-center p-3 sm:p-6 gap-y-3 sm:gap-y-4">
        <div>
          <h1 className=" capitalize text-3xl">{pokemon.name}</h1>
          <p className="text-gray4">#{makeHundreds(pokemon.id)}</p>
        </div>
        <PokemonAvatar pokemon={pokemon} />
        <div className="flex gap-x-8">
          <p className="text-gray4 flex items-center gap-x-2 text-lg">
            <FaHeart /> <span className="text-gray5 font-bold">03</span>
          </p>
          <p className="text-gray4 flex items-center gap-x-2 text-lg">
            <FaStar className="relative -top-[1px]" /> <span className="text-gray5 font-bold">00</span>
          </p>
        </div>
      </ListItem>
      <ListItem classList="gap-3 !justify-center">
        {pokemon.types.map((type) => {
          return (
            <TypeBtn
              type={type}
              key={type}
            />
          );
        })}
      </ListItem>
      <ListItem>
        <h3 className="font-bold">Base Stat Total</h3>
        <p>{getBaseStatTotal(Object.values(stats))}</p>
      </ListItem>
      {Object.keys(stats).map((stat) => {
        return (
          <ListItem key={stat}>
            <h3 className="font-bold">{stat}</h3>
            <p>{stats[stat]}</p>
          </ListItem>
        );
      })}
      <ListItem>
        <h3 className="font-bold">Reviews</h3>
        <p>{reviewCnt}</p>
      </ListItem>
      <ListItem classList="!justify-center">
        <p className="font-bold">Featured on 0 Teams!</p>
      </ListItem>
      {!!currentUser.id && (
        <ListItem>
          <Button
            action={() => {
              setShowAddToTeam(true);
            }}>
            <Button.Secondary>Add to Team</Button.Secondary>
          </Button>
        </ListItem>
      )}
      <li className="border-b text-xs sm:text-sm border-white border-opacity-10 border-solid px-8 sm:px-6 py-2 flex justify-between">
        <PokeNavBtn
          pkmnId={setNav(pokemon.id).prev}
          direction={"prev"}
        />
        <PokeNavBtn
          pkmnId={setNav(pokemon.id).next}
          direction={"next"}
        />
      </li>
      {showAddToTeam && (
        <AddToTeam
          onClose={() => {
            setShowAddToTeam(false);
          }}
          userId={currentUser.id}
          pkmnId={pokemon.id}
        />
      )}
    </ul>
  );
}
