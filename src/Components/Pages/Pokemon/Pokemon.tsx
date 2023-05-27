import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Pokefile from "./Pokefile";
import PostForm from "../../Forms/PostForm";
import ReviewList from "./ReviewList";
import Loading from "../../Loader/Loading";

import { titleCase } from "../../../Helpers/Helpers";
import usePokemon from "../../../CustomHooks/usePokemon";
import { RootState } from "../../../Redux/store";
import { IPokemon } from "../../../Helpers/Interfaces";

//TODO: rework pokemon fetching to exclude django API

const Pokemon = () => {
  const { id } = useParams();
  const { data: pokemon, isLoading }: { data: IPokemon; isLoading: boolean } = usePokemon(id);
  const user = useSelector((state: RootState) => state.loggedUser);
  const reviews = useSelector((state: RootState) =>
    state.reviews.filter((review) => review.pkmn === parseInt(id as string)).reverse()
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="profile">
      <Pokefile pokemon={pokemon} />
      <div className="post-column">
        {user && (
          <PostForm
            btnText={"Post"}
            placeholder={`What do you think of ${titleCase(pokemon.name)}?`}
            type={{ name: "REVIEW", id: parseInt(id as string) }}
          />
        )}
        {reviews.length !== 0 ? <ReviewList reviews={reviews} /> : <div className="card">No reviews yet!!</div>}
      </div>
    </div>
  );
};

export default Pokemon;
