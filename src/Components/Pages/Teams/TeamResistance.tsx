import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCirclePlus, faHeartCircleMinus, faShield, faHeart } from "@fortawesome/free-solid-svg-icons";
import { IRTable } from "../../../Helpers/Interfaces";

interface ITeamResistanceProps {
  rTable: IRTable;
}

export default function TeamResistance({ rTable }: ITeamResistanceProps) {
  return (
    <ul className="list-group">
      <li className="list-group-item">
        <h5 className="bold">Type Resistance</h5>
      </li>

      <li className="list-group-item chart-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Types</th>
              <th scope="col">
                <FontAwesomeIcon icon={faHeartCircleMinus} />
              </th>
              <th scope="col">
                <FontAwesomeIcon icon={faHeartCirclePlus} />
              </th>
              <th scope="col">
                <FontAwesomeIcon icon={faShield} />
              </th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(rTable).map((pkmnType) => (
              <tr>
                <th scope="row">{pkmnType}</th>
                {Object.values(rTable[pkmnType]).map((value) => (
                  <td>{value === 0 ? "-" : value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </li>
      <li
        className="list-group-item"
        id="toggle-weakness">
        <p>Hide/Display Resistances</p>
      </li>
    </ul>
  );
}
