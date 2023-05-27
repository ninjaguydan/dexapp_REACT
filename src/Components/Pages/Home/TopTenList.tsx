import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";

import Loading from "../../Loader/Loading";

import useTopTen from "../../../Hooks/useTopTen";
import { getRandomInt, titleCase } from "../../../Helpers/Helpers";
import { IPokemon } from "../../../Helpers/Interfaces";

function TopTenList() {
  let arr = [];
  while (arr.length < 10) {
    arr.push(getRandomInt(1, 899));
  }
  const { data: pkmn, isLoading }: { data: IPokemon[]; isLoading: boolean } = useTopTen(arr);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ol
      className="card list-group"
      id="style-4">
      <li className="list-group-item">
        <h5 className="bold header1">Top 10</h5>
      </li>
      {pkmn.map((item, index) => {
        return (
          <li
            className="list-group-item"
            key={item.id}>
            <Link to={`/pokemon/${item.id}`}>
              <img
                src={item.art_url}
                alt={`${item.name}'s official art`}
              />
              <div className="info">
                <h6 className="bold">{titleCase(item.name)}</h6>
                <div className="icon-group">
                  <p>
                    <FaHeart /> 1.2k
                  </p>
                  <p>
                    <FaStar /> 10
                  </p>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

export default memo(TopTenList);
