import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useParams, useNavigate } from "react-router-dom";

import PostForm from "components/common/posts/PostForm";
import PokemonSummary from "components/pages/pokemon/PokemonSummary";
import ReviewList from "components/common/posts/ReviewList";

import useFetchPkmn from "hooks/fetchers/useFetchPkmn";

import { titleCase } from "utils/Helpers";
import { IPokemon } from "utils/Interfaces";

const PokemonProfile = () => {
  const { id } = useParams();
  const { data: pkmnData, isLoading }: { data: IPokemon | undefined; isLoading: boolean } = useFetchPkmn(parseInt(id!));
  const user = useSelector((state: RootState) => state.loggedUser);
  const reviews = useSelector((state: RootState) =>
    state.reviews.filter((review) => review.pkmn === parseInt(id as string)).reverse()
  );

  return (
    <div className="flex flex-col w-full gap-x-4 gap-y-4 sm:flex-row">
      <PokemonSummary
        pokemon={pkmnData}
        isLoading={isLoading}
      />
      <div className="w-full">
        {!!user.id && pkmnData && (
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
