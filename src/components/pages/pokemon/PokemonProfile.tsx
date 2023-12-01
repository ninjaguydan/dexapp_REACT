import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import ProfileTab from 'components/common/buttons/ProfileTab'
import PostForm from 'components/common/posts/PostForm'
import ReviewList from 'components/common/posts/ReviewList'
import TeamList from 'components/common/posts/TeamList'
import Card from 'components/modules/Card/index'
import PokemonSummary from 'components/pages/pokemon/PokemonSummary'

import useFetchPkmn from 'hooks/fetchers/useFetchPkmn'
import { useAppSelector } from 'hooks/hooks'
import { selectCurrentUser } from 'redux/slices/authSlice'
import { makeSelectReviewsByPkmn } from 'redux/slices/reviewSlice'
import { selectTeamsByPkmn } from 'redux/slices/teamSlice'
import { titleCase } from 'utils/Helpers'
import { IPokemon } from 'utils/Interfaces'

type fetchedPkmn = { data: IPokemon | undefined; isLoading: boolean }

const PokemonProfile = () => {
	const { id } = useParams<string>()
	const pkmnId: number = parseInt(id!)
	const currentUser = useAppSelector(selectCurrentUser)
	const selectReviews = useMemo(makeSelectReviewsByPkmn, [])
	const reviews = useAppSelector(state => selectReviews(state, pkmnId))
	const teams = useAppSelector(state => selectTeamsByPkmn(state, pkmnId))
	const { data: pokemon, isLoading }: fetchedPkmn = useFetchPkmn(pkmnId)
	const [activeTab, setActiveTab] = useState<'Reviews' | 'Teams'>('Reviews')

	return (
		<div className="flex w-full flex-col gap-x-4 gap-y-4 sm:flex-row">
			<PokemonSummary pokemon={pokemon} isLoading={isLoading} />
			<div className="w-full">
				<div className="flex gap-1 sm:max-w-sm">
					<ProfileTab
						action={() => setActiveTab('Reviews')}
						label="Reviews"
						isActive={activeTab === 'Reviews'}
					/>
					<ProfileTab
						action={() => setActiveTab('Teams')}
						label="Teams"
						isActive={activeTab === 'Teams'}
					/>
				</div>
				{activeTab === 'Reviews' && (
					<>
						{!!currentUser.userInfo && pokemon && (
							<PostForm
								btnText={'Post'}
								placeholder={`What do you think${
									pokemon ? ` of ${titleCase(pokemon.name)}?` : '?'
								}`}
								type={{ name: 'REVIEW', id: parseInt(id as string) }}
							/>
						)}
						{reviews.length !== 0 ? (
							<ReviewList reviews={reviews} />
						) : (
							<Card>No reviews yet!!</Card>
						)}
					</>
				)}
				{activeTab === 'Teams' && <TeamList teams={teams} />}
			</div>
		</div>
	)
}

export default PokemonProfile
