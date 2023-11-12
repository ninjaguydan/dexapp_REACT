import { Link } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";

import Spinner from "components/modules/Spinner";

import useFetchPkmn from "hooks/fetchers/useFetchPkmn";

import setImage from "utils/setDefaultImg";
import { getRandomFloat } from "utils/Helpers";

export default function TopTenCard({ id }: { id: number }) {
  const { data: pkmnData, isLoading } = useFetchPkmn(id);

  if (isLoading || !pkmnData) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <li
      className="list-group-item flex items-center gap-x-2 sm:gap-x-4 border border-white border-solid border-opacity-10 p-2 sm:p-4 min-w-max lg:min-w-0"
      key={pkmnData.id}>
      <Link
        to={`/pokemon/${pkmnData.id}`}
        className="flex items-center w-full gap-x-2 sm:gap-x-4 group ">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pkmnData.id}.png`}
          alt={`${pkmnData.name}'s official art`}
          className="w-24 sm:w-28"
          onError={(e) => {
            setImage(e);
          }}
        />
        <div className="flex flex-col gap-y-2">
          <h3 className="font-bold group-hover:underline lg:text-lg capitalize">{pkmnData.name}</h3>
          <div className="flex flex-col lg:flex-row gap-x-4">
            <p className="flex items-center gap-x-2">
              <FaHeart className="text-gray3" /> {getRandomFloat(1, 99)}k
            </p>
            <p className="flex items-center gap-x-2">
              <FaStar className="-top-[1px] relative text-gray3" /> 10
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}
