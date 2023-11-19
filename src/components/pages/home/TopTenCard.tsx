import { FaHeart, FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import Spinner from 'components/modules/Spinner'

import useFetchPkmn from 'hooks/fetchers/useFetchPkmn'
import { getRandomFloat } from 'utils/Helpers'
import setImage from 'utils/setDefaultImg'

export default function TopTenCard({ id }: { id: number }) {
	const { data: pkmnData, isLoading } = useFetchPkmn(id)

	if (isLoading || !pkmnData) {
		return (
			<div className="flex items-center justify-center">
				<Spinner />
			</div>
		)
	}
	return (
		<li
			className="list-group-item flex min-w-max items-center gap-x-2 border border-solid border-white border-opacity-10 p-2 sm:gap-x-4 sm:p-4 lg:min-w-0"
			key={pkmnData.id}
		>
			<Link
				to={`/pokemon/${pkmnData.id}`}
				className="group flex w-full items-center gap-x-2 sm:gap-x-4 "
			>
				<img
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pkmnData.id}.png`}
					alt={`${pkmnData.name}'s official art`}
					className="w-24 sm:w-28"
					onError={e => {
						setImage(e)
					}}
				/>
				<div className="flex flex-col gap-y-2">
					<h3 className="font-bold capitalize group-hover:underline lg:text-lg">
						{pkmnData.name}
					</h3>
					<div className="flex flex-col gap-x-4 lg:flex-row">
						<p className="flex items-center gap-x-2">
							<FaHeart className="text-gray3" /> {getRandomFloat(1, 99)}k
						</p>
						<p className="flex items-center gap-x-2">
							<FaStar className="relative -top-[1px] text-gray3" /> 10
						</p>
					</div>
				</div>
			</Link>
		</li>
	)
}
