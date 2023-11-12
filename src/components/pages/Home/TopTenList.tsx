import { memo } from "react";

import TopTenCard from "components/pages/home/TopTenCard";

import { getRandomInt } from "utils/Helpers";

let arr: number[] = [];
while (arr.length < 10) {
  arr.push(getRandomInt(1, 1017));
}

function TopTenList() {
  return (
    <ol
      className="relative flex w-full max-w-2xl overflow-auto lg:overflow-visible bg-gray2 rounded border border-white border-solid border-opacity-10 lg:flex-col lg:max-w-sm"
      id="style-4">
      <li className="flex items-center border border-white border-solid border-opacity-10 p-4">
        <h2 className="font-bold text-xl sm:text-3xl whitespace-nowrap">Top 10</h2>
      </li>
      {arr.map((id, index) => {
        return (
          <TopTenCard
            id={id}
            key={index}
          />
        );
      })}
    </ol>
  );
}

export default memo(TopTenList);
