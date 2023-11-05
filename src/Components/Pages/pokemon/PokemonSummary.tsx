import { useSelector } from "react-redux";
import { FaStar, FaHeart, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import TypeBtn from "components/common/buttons/TypeBtn";

import { IPokemon } from "utils/Interfaces";
import default_img from "media/0.png";
import { makeHundreds, getBaseStatTotal } from "utils/Helpers";
import { RootState } from "redux/store";
import usePkmnTotal from "hooks/usePkmnTotal";

interface IPokefileProps {
  pokemon: IPokemon;
}

const PokemonSummary = ({ pokemon }: IPokefileProps) => {
  // const { total } = usePkmnTotal();
  const currentUser = useSelector((state: RootState) => state.loggedUser);
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
  pokemon.id === 1 ? (prev = 1010) : (prev = pokemon.id - 1);
  pokemon.id === 1010 ? (next = 1) : (next = pokemon.id + 1);

  function grabImage(num: number) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png`;
  }
  function setImage(event: any) {
    event.target.src = default_img;
  }

  return (
    <ul className="group relative bg-gray2 rounded border border-white border-opacity-10 border-solid [&_li:nth-child(even)]:bg-gray6">
      <li className="border-b border-white border-opacity-10 border-solid p-6 text-center flex flex-col gap-y-4 items-center">
        <div>
          <h2 className="font-bold uppercase">{pokemon.name}</h2>
          <p className="text-gray4">#{makeHundreds(pokemon.id)}</p>
        </div>
        <img
          src={pokemon.art_url}
          alt={`${pokemon.name}'s official artwork`}
          className=""
        />
        <div className="flex gap-x-8">
          <p className="text-gray4 flex items-center gap-x-2">
            <FaHeart /> <span className="text-gray5">03</span>
          </p>
          <p className="text-gray4 flex items-center gap-x-2">
            <FaStar className="relative -top-[1px]" /> <span className="text-gray5">00</span>
          </p>
        </div>
      </li>
      <li className="border-b border-white border-opacity-10 border-solid p-6 flex flex-col xsm:flex-row justify-center gap-3">
        {pokemon.types.map((type) => {
          return <TypeBtn type={type} />;
        })}
      </li>
      <li className="border-b text-sm border-white border-opacity-10 border-solid px-6 py-2 flex justify-between">
        <h3 className="font-bold">Base Stat Total</h3>
        <p>{getBaseStatTotal(Object.values(stats))}</p>
      </li>
      {Object.keys(stats).map((stat) => {
        return (
          <li
            className="border-b text-sm border-white border-opacity-10 border-solid px-6 py-2 flex justify-between"
            key={stat}>
            <h3 className="font-bold">{stat}</h3>
            <p>{stats[stat]}</p>
          </li>
        );
      })}
      <li className="border-b text-sm border-white border-opacity-10 border-solid px-6 py-2 flex justify-between">
        <h3 className="font-bold">Reviews</h3>
        <p>{reviewCnt}</p>
      </li>
      <li
        className="border-b text-sm border-white border-opacity-10 border-solid px-6 py-2 flex justify-between"
        style={{ justifyContent: "center" }}>
        <p className="font-bold">Featured on 0 Teams!</p>
      </li>
      {/* {loggedInUser && (
				<li className="list-group-item striped">
					<button className="btn secondary">Add to Team</button>
					<button className="btn secondary">
						<FaStar /> Favorite
					</button>
				</li>
			)} */}
      <li className="border-b text-sm border-white border-opacity-10 border-solid px-6 py-2 flex justify-between">
        <Link
          to={`/pokemon/${prev}`}
          className="flex items-center justify-center gap-x-4">
          <FaArrowLeft />
          <img
            src={grabImage(prev)}
            onError={(e) => {
              setImage(e);
            }}
            className="w-16 h-16 rounded-full bg-gray1 hover:ring-2 hover:ring-gray3"
          />
        </Link>
        <Link
          to={`/pokemon/${next}`}
          className="flex items-center justify-center gap-x-4">
          <img
            src={grabImage(next)}
            onError={(e) => {
              setImage(e);
            }}
            className="w-16 h-16 rounded-full bg-gray1 hover:ring-2 hover:ring-gray3"
          />
          <FaArrowRight />
        </Link>
      </li>
    </ul>
  );
};

export default PokemonSummary;
