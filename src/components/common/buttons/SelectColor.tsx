interface ISelectColorProps {
	selected: boolean
	click: (e: any) => void
	color: string
}

const SelectColor = ({ selected, click, color }: ISelectColorProps) => {
	return (
		<button
			id={color}
			name="bg_color"
			type="button"
			onClick={event => click(event)}
			className={`w-full rounded-lg after:block after:pb-[100%] after:content-[''] ${color} ${
				selected ? 'ring-2 ring-white' : ''
			}`}
		></button>
	)
}

export default SelectColor
