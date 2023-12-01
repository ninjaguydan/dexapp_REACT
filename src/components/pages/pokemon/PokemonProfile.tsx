import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import PostForm from 'components/common/posts/PostForm'
import ReviewList from 'components/common/posts/ReviewList'
import PokemonSummary from 'components/pages/pokemon/PokemonSummary'

import useFetchPkmn from 'hooks/fetchers/useFetchPkmn'
import { useAppSelector } from 'hooks/hooks'
import { selectCurrentUser } from 'redux/slices/authSlice'
import { selectReviewsByPkmn } from 'redux/slices/reviewSlice'
import { titleCase } from 'utils/Helpers'
import { IPokemon } from 'utils/Interfaces'

import Card from '../../modules/Card/index'

const PokemonProfile = () => {
	const { id } = useParams<string>()
	const pkmnId: number = parseInt(id!)
	const currentUser = useAppSelector(selectCurrentUser)
	const selectReviews = useMemo(selectReviewsByPkmn, [])
	const reviews = useAppSelector(state => selectReviews(state, pkmnId))
	const { data: pkmnData, isLoading }: { data: IPokemon | undefined; isLoading: boolean } =
		useFetchPkmn(pkmnId)

	return (
		<div className="flex w-full flex-col gap-x-4 gap-y-4 sm:flex-row">
			<PokemonSummary pokemon={pkmnData} isLoading={isLoading} />
			<div className="w-full">
				{!!currentUser.userInfo && pkmnData && (
					<PostForm
						btnText={'Post'}
						placeholder={`What do you think${
							pkmnData ? ` of ${titleCase(pkmnData.name)}?` : '?'
						}`}
						type={{ name: 'REVIEW', id: parseInt(id as string) }}
					/>
				)}
				{reviews.length !== 0 ? (
					<ReviewList reviews={reviews} />
				) : (
					<Card>No reviews yet!!</Card>
				)}
			</div>
		</div>
	)
}

export default PokemonProfile
