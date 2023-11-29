import { Link } from 'react-router-dom'

import TypeBtn from 'components/common/buttons/TypeBtn'
import Spinner from 'components/modules/Spinner'

import { ROOT_URL } from 'api/urls'
import useFetchPkmn from 'hooks/fetchers/useFetchPkmn'
import setImage from 'utils/setDefaultImg'

type Props = {
	pokemon_id: number
	classList?: string
}

export default function PokemonCard({ pokemon_id, classList }: Props) {
	const { data: pokemon, isLoading } = useFetchPkmn(pokemon_id)

	if (isLoading || !pokemon) return <Spinner />

	return (
		<Link
			to={`/${ROOT_URL}/pokemon/${pokemon.id}`}
			key={pokemon.id}
			className="flex flex-col gap-y-2 rounded-2xl bg-gray6 p-3 hover:ring-2 hover:ring-gray3 sm:p-6"
		>
			<h3 className="text-center text-sm capitalize">{pokemon.name}</h3>
			<img
				src={pokemon.art_url}
				alt={`${pokemon.name}'s offical art`}
				onError={e => {
					setImage(e)
				}}
			/>
			<div className="mt-auto flex flex-col justify-center gap-2 text-xs">
				{pokemon.types.map((type, i) => (
					<TypeBtn
						key={type}
						type={type}
						classList="max-w-full !p-1 font-normal leading-none"
					/>
				))}
			</div>
		</Link>
	)
}
