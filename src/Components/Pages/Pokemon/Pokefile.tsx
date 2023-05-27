import "../../../css/Pkmn_types.css";
import { useSelector } from "react-redux";
import { FaStar, FaHeart, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import { makeHundreds, getBaseStatTotal } from "../../../Helpers/Helpers";
import { RootState } from "../../../Redux/store";
import { IPokemon } from "../../../Helpers/Interfaces";
import default_img from "../../../media/0.png";

interface IPokefileProps {
  pokemon: IPokemon;
}

const Pokefile = ({ pokemon }: IPokefileProps) => {
  // const loggedInUser = useSelector((state: RootState) => state.loggedUser);
  const reviewCnt = useSelector((state: RootState) => state.reviews.filter((review) => review.pkmn === pokemon.id).length);
  const stats: { [key: string]: number } = {
    HP: pokemon.hp,
    Attack: pokemon.attack,
    Defense: pokemon.defense,
    "Special Attack": pokemon.sp_attack,
    "Special Defense": pokemon.sp_defense,
    Speed: pokemon.speed,
  };

  let prev;
  let next;
  pokemon.id === 1 ? (prev = 898) : (prev = pokemon.id - 1);
  pokemon.id === 898 ? (next = 1) : (next = pokemon.id + 1);

  function grabImage(num: number) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png`;
  }
  function setImage(event: any) {
    event.target.src = default_img;
  }

  return (
    <ul className="card">
      <li className="list-group-item">
        <h2 className="header1">{pokemon.name}</h2>
        <p>#{makeHundreds(pokemon.id)}</p>
        <img
          src={pokemon.art_url}
          alt={`${pokemon.name}'s official artwork`}
          className="main-img"
        />
        <div className="icon-group">
          <p>
            <FaHeart /> 00
          </p>
          <p>
            <FaStar /> 00
          </p>
        </div>
      </li>
      <li className="list-group-item type-group bold">
        {pokemon.types.map((type) => {
          return (
            <p
              key={type}
              className={`type ${type.toLowerCase()}`}>
              {type}
            </p>
          );
        })}
      </li>
      <li className="list-group-item striped">
        <h3 className="bold">Base Stat Total</h3>
        <p>{getBaseStatTotal(Object.values(stats))}</p>
      </li>
      {Object.keys(stats).map((stat) => {
        return (
          <li
            className="list-group-item striped"
            key={stat}>
            <h3 className="bold">{stat}</h3>
            <p>{stats[stat]}</p>
          </li>
        );
      })}
      <li className="list-group-item striped">
        <h3 className="bold">Reviews</h3>
        <p>{reviewCnt}</p>
      </li>
      <li
        className="list-group-item striped"
        style={{ justifyContent: "center" }}>
        <p className="bold">Featured on 0 Teams!</p>
      </li>
      {/* {loggedInUser && (
				<li className="list-group-item striped">
					<button className="btn secondary">Add to Team</button>
					<button className="btn secondary">
						<FaStar /> Favorite
					</button>
				</li>
			)} */}
      <li className="list-group-item striped">
        <Link
          to={`/pokemon/${prev}`}
          className="pokenav">
          <FaArrowLeft />
          <img
            src={grabImage(prev)}
            onError={(e) => {
              setImage(e);
            }}
          />
        </Link>
        <Link
          to={`/pokemon/${next}`}
          className="pokenav">
          <img
            src={grabImage(next)}
            onError={(e) => {
              setImage(e);
            }}
          />
          <FaArrowRight />
        </Link>
      </li>
    </ul>
  );
};

export default Pokefile;
