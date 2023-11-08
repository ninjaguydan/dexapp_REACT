import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import PostForm from "components/common/forms/PostForm";
import Loading from "components//common/loader/Loading";
import PokemonSummary from "components/pages/pokemon/PokemonSummary";
import ReviewList from "components/common/posts/ReviewList";

import { RootState } from "redux/store";
import { titleCase } from "utils/Helpers";
import usePokemon from "hooks/fetchers/usePokemon";
import { IPokemon } from "utils/Interfaces";

const PokemonProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pkmnData, isLoading }: { pkmnData: IPokemon; isLoading: boolean } = usePokemon(id);
  const user = useSelector((state: RootState) => state.loggedUser);
  const reviews = useSelector((state: RootState) =>
    state.reviews.filter((review) => review.pkmn === parseInt(id as string)).reverse()
  );

  useEffect(() => {
    if (parseInt(id as string) > 1010) {
      navigate("/not-found");
    }
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col w-full gap-x-4 gap-y-4 sm:flex-row">
      <PokemonSummary pokemon={pkmnData} />
      <div className="w-full">
        {!!user.id && (
          <PostForm
            btnText={"Post"}
            placeholder={`What do you think of ${titleCase(pkmnData.name)}?`}
            type={{ name: "REVIEW", id: parseInt(id as string) }}
          />
        )}
        {reviews.length !== 0 ? (
          <ReviewList reviews={reviews} />
        ) : (
          <div className="bg-gray2 rounded border border-white border-opacity-10 border-solid p-4">No reviews yet!!</div>
        )}
      </div>
    </div>
  );
};

export default PokemonProfile;
