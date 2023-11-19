import { styleType } from 'utils/styleType'

interface Props {
	type: string
	classList?: string
}

function TypeBtn({ type, classList }: Props) {
	return (
		<button
			style={styleType(type)}
			className={`w-full max-w-[156px] rounded-full border border-solid border-white border-opacity-10 p-1 text-xs font-bold capitalize ${classList}`}
		>
			{type}
		</button>
	)
}
export default TypeBtn
