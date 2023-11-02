import { Link } from "react-router-dom";

import { makeHundreds } from "utils/Helpers";

interface IResultCardProps {
  id: number;
  art_url: string;
  name: string;
}

const ResultCard = ({ id, art_url, name }: IResultCardProps) => {
  return (
    <Link to={`/pokemon/${id}`}>
      <div className="card">
        <p>#{makeHundreds(id)}</p>
        <img
          src={art_url}
          alt={`${name}'s official artwork`}
        />
        <p>{name}</p>
      </div>
    </Link>
  );
};

export default ResultCard;
