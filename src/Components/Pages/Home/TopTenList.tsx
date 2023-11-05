import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";

import Loading from "components/common/loader/Loading";

import { getRandomInt, getRandomFloat, titleCase } from "utils/Helpers";
import usePokemon from "hooks/usePokemon";

let arr: number[] = [];
while (arr.length < 10) {
  arr.push(getRandomInt(1, 1010));
}

function TopTenList() {
  const { teamData: pkmn, isLoading } = usePokemon("", arr);

  return (
    <ol
      className="relative flex w-full max-w-2xl overflow-auto lg:overflow-visible bg-gray2 rounded border border-white border-solid border-opacity-10 lg:flex-col lg:max-w-sm"
      id="style-4">
      <li className="flex items-center border border-white border-solid border-opacity-10 p-4">
        <h2 className="font-bold text-3xl whitespace-nowrap">Top 10</h2>
      </li>
      {pkmn.map((item, index) => {
        if (isLoading) {
          return <Loading key={item.id} />;
        } else {
          return (
            <li
              className="list-group-item flex items-center gap-x-4 border border-white border-solid border-opacity-10 p-4 min-w-max lg:min-w-0"
              key={item.id}>
              <Link
                to={`/pokemon/${item.id}`}
                className="flex items-center w-full gap-x-4 group ">
                <img
                  src={item.art_url}
                  alt={`${item.name}'s official art`}
                  className="w-28"
                />
                <div className="flex flex-col gap-y-2">
                  <h3 className="font-bold group-hover:underline lg:text-lg">{titleCase(item.name)}</h3>
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
      })}
    </ol>
  );
}

export default memo(TopTenList);
