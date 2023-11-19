import { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import setImage from 'utils/setDefaultImg'

type Props = {
	pkmnId: number | undefined
	direction: 'prev' | 'next'
}

function scrollToTop() {
	window.scrollTo(0, 0)
}

function setNav(
	pokemonId: number | undefined,
	total: number = 10275,
	gapStart: number = 1017,
	gapEnd: number = 10001,
): { prev: number; next: number } {
	if (!pokemonId) return { prev: 1, next: 1 }
	switch (pokemonId) {
		case 1:
			return { prev: total, next: pokemonId + 1 }
		case total:
			return { prev: pokemonId - 1, next: 1 }
		case gapStart:
			return { prev: pokemonId - 1, next: gapEnd }
		case gapEnd:
			return { prev: gapStart, next: pokemonId + 1 }
		default:
			return { prev: pokemonId - 1, next: pokemonId + 1 }
	}
}

export default function PokeNavBtn({ pkmnId, direction }: Props) {
	const [id, setId] = useState(1)

	useEffect(() => {
		setId(setNav(pkmnId)[direction])
	}, [pkmnId])

	let Arrow
	if (direction === 'next') {
		Arrow = <FaArrowRight />
	} else {
		Arrow = <FaArrowLeft />
	}

	return (
		<Link
			to={`/pokemon/${id}`}
			className={`flex items-center justify-center gap-x-4 ${
				direction === 'next' ? 'flex-row-reverse' : 'flex-row'
			}`}
			onClick={scrollToTop}
		>
			{Arrow}
			<img
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
				onError={e => {
					setImage(e)
				}}
				className="h-16 w-16 rounded-full bg-gray1 hover:ring-2 hover:ring-gray3"
			/>
		</Link>
	)
}
