import PokemonCard from 'components/common/posts/PokemonCard'

import placeholder from 'media/0.png'
import { IPokemon } from 'utils/Interfaces'

type Props = {
	team: number[]
}

export default function TeamGrid({ team }: Props) {
	const arr = [...Array(6).keys()]

	return (
		<div className="grid grid-cols-2 gap-8 rounded border border-solid border-white border-opacity-10 bg-gray2 p-4 sm:grid-cols-3 md:gap-6">
			{arr.map(index => {
				if (index < team.length) {
					return <PokemonCard key={index} pokemon_id={team[index]} />
				} else {
					return (
						<div
							key={index}
							className="flex items-center justify-center rounded-2xl bg-gray6"
						>
							<img src={placeholder} alt="placeholder" />
						</div>
					)
				}
			})}
		</div>
	)
}
