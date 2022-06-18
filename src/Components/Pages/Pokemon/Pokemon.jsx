import { useState } from "react"
import { useParams } from "react-router-dom"
import { titleCase } from "../../../Helpers/Helpers"
import usePokemon from "../../../Helpers/usePokemon"
import Pokefile from "../../Pages/Pokemon/Pokefile"
import ReviewList from "./ReviewList"
import PostForm from "../../Forms/PostForm"
import Loading from "../../Loader/Loading"
import { useSelector } from "react-redux"

const Pokemon = () => {
	const { id } = useParams()
	const { data: pokemon, isLoading } = usePokemon(id)
	const user = useSelector((state) => state.loggedUser)
	const reviews = useSelector((state) => state.reviews.filter((review) => review.pkmn === parseInt(id)).reverse())

	if (isLoading) {
		return <Loading />
	}

	return (
		<div className="profile">
			<Pokefile pokemon={pokemon} />
			<div className="post-column">
				{user && (
					<PostForm
						btnText={"Post"}
						placeholder={`What do you think of ${titleCase(pokemon.name)}?`}
						type={{ name: "REVIEW", id: parseInt(id) }}
					/>
				)}
				{reviews.length !== 0 ? <ReviewList reviews={reviews} /> : <div className="card">No reviews yet!!</div>}
			</div>
		</div>
	)
}

export default Pokemon
