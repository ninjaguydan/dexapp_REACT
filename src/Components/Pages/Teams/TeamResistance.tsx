import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCirclePlus, faHeartCircleMinus, faShield, faHeart } from "@fortawesome/free-solid-svg-icons";
import { IRTable } from "../../../Helpers/Interfaces";
import { useState } from "react";

interface ITeamResistanceProps {
  rTable: IRTable;
}

export default function TeamResistance({ rTable }: ITeamResistanceProps) {
  const [showTable, setShowTable] = useState(true);
  return (
    <ul className="card">
      <li className="list-group-item">
        <h5 className="bold">Type Resistance</h5>
      </li>

      <li className="list-group-item chart-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Types</th>
              <th
                scope="col"
                className="weak">
                <FontAwesomeIcon icon={faHeartCircleMinus} />
              </th>
              <th
                scope="col"
                className="resist">
                <FontAwesomeIcon icon={faHeartCirclePlus} />
              </th>
              <th
                scope="col"
                className="immune">
                <FontAwesomeIcon icon={faShield} />
              </th>
            </tr>
          </thead>
          {showTable && (
            <tbody>
              {Object.keys(rTable).map((pkmnType: string, i) => (
                <tr key={i}>
                  <th scope="row">{pkmnType}</th>
                  {Object.values(rTable[pkmnType]).map((value, i) => (
                    <td
                      key={i}
                      className={`${value !== 0 && "not-zero"} 
                       ${value > 3 && "high"} 
                       ${i === 1 && "resist"} 
                       ${i === 0 && "weak"}`}>
                      {value === 0 ? "-" : value}
                    </td>
                    // <td>{rTable.pkmnType[i]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </li>
      <li
        className="list-group-item"
        id="toggle-weakness">
        <button
          className="btn toggle-btn"
          onClick={() => {
            setShowTable(!showTable);
          }}>
          Hide/Display Resistances
        </button>
      </li>
    </ul>
  );
}
