import { useEffect, useState } from 'react'

import placeholder from 'media/0.png'
import { IPokemon } from 'utils/Interfaces'
import setImage from 'utils/setDefaultImg'

type Props = {
	normal_art: string | undefined
	shiny_art: string | undefined
	name: string | undefined
}

function toggleImage(
	option1: string | undefined,
	option2: string | undefined,
	state: string | undefined,
	action: React.Dispatch<React.SetStateAction<string | undefined>>,
): void {
	switch (state) {
		case option1:
			action(option2)
			return
		default:
			action(option1)
			return
	}
}

export default function PokemonAvatar({ normal_art, shiny_art, name }: Props) {
	const [currentImg, setCurrentImg] = useState(normal_art)

	useEffect(() => {
		setCurrentImg(normal_art)
	}, [normal_art])

	return (
		<button
			className="w-40 sm:w-3/5 lg:w-4/5"
			onClick={() => {
				toggleImage(normal_art, shiny_art, currentImg, setCurrentImg)
			}}
		>
			<img
				src={currentImg || placeholder}
				alt={`${name}'s official artwork`}
				className=""
				onError={e => {
					setImage(e)
				}}
			/>
		</button>
	)
}
