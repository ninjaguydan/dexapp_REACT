import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";

import Loading from "components/common/loader/Loading";

import { getRandomInt, getRandomFloat, titleCase } from "utils/Helpers";
import { IPokemon } from "utils/Interfaces";
import usePokemon from "hooks/usePokemon";

function TopTenList() {
  let arr = [];
  while (arr.length < 10) {
    arr.push(getRandomInt(1, 1010));
  }
  const { teamData: pkmn, isLoading } = usePokemon("", arr);

  return (
    <ol
      className="card list-group"
      id="style-4">
      <li className="list-group-item">
        <h5 className="bold header1">Top 10</h5>
      </li>
      {pkmn.map((item, index) => {
        if (isLoading) {
          return <Loading key={item.id} />;
        } else {
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
                      <FaHeart /> {getRandomFloat(1, 99)}k
                    </p>
                    <p>
                      <FaStar /> 10
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
