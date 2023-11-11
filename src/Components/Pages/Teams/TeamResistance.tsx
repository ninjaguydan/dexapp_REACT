import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { HeartPlus, HeartMinus, Shield } from "components/common/icons/index";

import useSetResistance from "hooks/fetchers/useSetResistance";
import { IRTable } from "utils/Interfaces";

interface ITeamResistanceProps {
  team: number[];
}

export default function TeamResistance({ team }: ITeamResistanceProps) {
  const [showTable, setShowTable] = useState(true);
  const { resistanceTable: table } = useSetResistance(team);

  return (
    <ul className="w-full h-[fit-content] relative bg-gray2 rounded border border-white border-opacity-10 border-solid">
      <li className="border-b border-white border-opacity-10 border-solid p-3 sm:p-6 text-center">
        <h2 className="font-bold uppercase">Type Resistance</h2>
      </li>
      <li className="chart-container">
        <table className="w-full">
          <thead>
            <tr className="border-b border-solid border-gray3 bg-gray6">
              <th
                scope="col"
                className="pl-8 text-sm sm:text-base">
                Type
              </th>
              <th
                scope="col"
                className="text-red-500 px-3 py-2">
                <span className="sr-only">Weaknesses</span>
                <FontAwesomeIcon icon={HeartMinus} />
              </th>
              <th
                scope="col"
                className="text-greenLight px-3 py-2">
                <span className="sr-only">Resistances</span>
                <FontAwesomeIcon icon={HeartPlus} />
              </th>
              <th
                scope="col"
                className="text-gray4 px-3 py-2">
                <span className="sr-only">Immunities</span>
                <FontAwesomeIcon icon={Shield} />
              </th>
            </tr>
          </thead>
          {showTable && (
            <tbody className="[&_tr:nth-child(even)]:bg-gray6">
              {Object.keys(table).map((pkmnType: string, i) => (
                <tr key={i}>
                  <th
                    scope="row"
                    className="capitalize pl-8 text-sm sm:text-base">
                    {pkmnType}
                  </th>
                  {Object.values(table[pkmnType]).map((value, i) => (
                    <td
                      key={i}
                      className={`text-gray4 px-3 py-1 sm:py-2 ${value > 3 ? "font-bold text-base sm:text-xl" : ""} ${
                        i === 1 && value > 2 ? "text-greenLight" : ""
                      } ${i === 0 && value > 2 ? "text-red-500" : ""} ${value > 0 ? "text-gray5 text-sm" : ""}`}>
                      {value === 0 ? "-" : value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </li>
      <li
        className="border-b border-white border-opacity-10 border-solid px-8 sm:px-6 p-3 sm:p-6 text-center"
        id="toggle-weakness">
        <button
          className="py-1 px-8 w-full rounded border border-solid hover:bg-gray3 text-xs"
          onClick={() => {
            setShowTable(!showTable);
          }}>
          Hide/Display Resistances
        </button>
      </li>
    </ul>
  );
}
