import { useState } from "react";
import { useSelector } from "react-redux";
import { FaStar, FaHeart } from "react-icons/fa";
import { RootState } from "redux/store";

import TypeBtn from "components/common/buttons/TypeBtn";
import PokemonAvatar from "components/common/buttons/PokemonAvatar";
import PokeNavBtn from "components/common/buttons/PokeNavBtn";
import AddToTeam from "components/common/modals/AddToTeam";

import ListItem from "components/modules/ListItem";
import Button from "components/modules/Button";

import { makeHundreds, getBaseStatTotal } from "utils/Helpers";
import { IPokemon } from "utils/Interfaces";
import Spinner from "components/modules/Spinner";

interface Props {
  pokemon: IPokemon | undefined;
  isLoading: boolean;
}

export default function PokemonSummary({ pokemon, isLoading }: Props) {
  const [showAddToTeam, setShowAddToTeam] = useState(false);
  const currentUser = useSelector((state: RootState) => state.loggedUser);
  const reviewCnt = useSelector((state: RootState) => state.reviews.filter((review) => review.pkmn === pokemon?.id).length);
  const stats: { [key: string]: number } = {
    HP: pokemon?.hp || 0,
    Attack: pokemon?.attack || 0,
    Defense: pokemon?.defense || 0,
    "Special Attack": pokemon?.sp_attack || 0,
    "Special Defense": pokemon?.sp_defense || 0,
    Speed: pokemon?.speed || 0,
  };

  return (
    <ul className="sm:min-w-[285px] md:min-w-[340px] group relative bg-gray2 rounded border border-white border-opacity-10 border-solid [&_li:nth-child(even)]:bg-gray6">
      <ListItem classList="flex flex-col items-center text-center p-3 sm:p-6 gap-y-3 sm:gap-y-4">
        {isLoading ? (
          <>
            <div>
              <h1 className=" capitalize text-3xl opacity-0">Loading </h1>
              <p className="text-gray4 opacity-0">#</p>
            </div>
            <div className="h-[160px] md:h-[233px]">
              <Spinner color="#323442" />
            </div>
            <div className="flex gap-x-8">
              <p className="text-gray4 flex items-center gap-x-2 text-lg">
                <FaHeart /> <span className="text-gray5 font-bold">00</span>
              </p>
              <p className="text-gray4 flex items-center gap-x-2 text-lg">
                <FaStar className="relative -top-[1px]" /> <span className="text-gray5 font-bold">00</span>
              </p>
            </div>
          </>
        ) : (
          <>
            <div>
              <h1 className=" capitalize text-3xl">{pokemon?.name || "MissingNo."}</h1>
              <p className="text-gray4">#{makeHundreds(pokemon?.id)}</p>
            </div>
            <PokemonAvatar
              name={pokemon?.name}
              normal_art={pokemon?.art_url}
              shiny_art={pokemon?.shiny_url}
            />
            <div className="flex gap-x-8">
              <p className="text-gray4 flex items-center gap-x-2 text-lg">
                <FaHeart /> <span className="text-gray5 font-bold">03</span>
              </p>
              <p className="text-gray4 flex items-center gap-x-2 text-lg">
                <FaStar className="relative -top-[1px]" /> <span className="text-gray5 font-bold">00</span>
              </p>
            </div>
          </>
        )}
      </ListItem>
      <ListItem classList="gap-3 !justify-center">
        {pokemon?.types.map((type) => {
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
        <p>{reviewCnt || 0}</p>
      </ListItem>
      <ListItem classList="!justify-center">
        <p className="font-bold">Featured on 0 Teams!</p>
      </ListItem>
      {!!currentUser.id && pokemon && (
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
          pkmnId={pokemon?.id}
          direction={"prev"}
        />
        <PokeNavBtn
          pkmnId={pokemon?.id}
          direction={"next"}
        />
      </li>
      {showAddToTeam && (
        <AddToTeam
          onClose={() => {
            setShowAddToTeam(false);
          }}
          userId={currentUser.id}
          pkmnId={pokemon!.id}
        />
      )}
    </ul>
  );
}
