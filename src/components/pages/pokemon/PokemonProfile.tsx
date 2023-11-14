import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useAppSelector } from "hooks/hooks";
import useFetchPkmn from "hooks/fetchers/useFetchPkmn";

import PostForm from "components/common/posts/PostForm";
import PokemonSummary from "components/pages/pokemon/PokemonSummary";
import ReviewList from "components/common/posts/ReviewList";

import { titleCase } from "utils/Helpers";
import { IPokemon } from "utils/Interfaces";

import { selectCurrentUser } from "redux/slices/authSlice";
import { selectReviewsByPkmn } from "redux/slices/reviewSlice";

const PokemonProfile = () => {
  // parameter: "pokemon/number"
  const { id } = useParams<string>();
  const pkmnId: number = parseInt(id!);
  // logged in user
  const currentUser = useAppSelector(selectCurrentUser);
  // get memoized reviews
  const selectReviews = useMemo(selectReviewsByPkmn, []);
  const reviews = useAppSelector((state) => selectReviews(state, pkmnId));
  // fetch Pokemon
  const { data: pkmnData, isLoading }: { data: IPokemon | undefined; isLoading: boolean } = useFetchPkmn(pkmnId);

  return (
    <div className="flex flex-col w-full gap-x-4 gap-y-4 sm:flex-row">
      <PokemonSummary
        pokemon={pkmnData}
        isLoading={isLoading}
      />
      <div className="w-full">
        {!!currentUser.userToken && pkmnData && (
          <PostForm
            btnText={"Post"}
            placeholder={`What do you think${pkmnData ? ` of ${titleCase(pkmnData.name)}?` : "?"}`}
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
