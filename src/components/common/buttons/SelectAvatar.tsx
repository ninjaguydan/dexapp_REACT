import getImageByKey from 'utils/getImageByKey'

interface ISelectAvatarProps {
	selected: boolean
	click: (e: any) => void
	id: string
}

const SelectAvatar = ({ click, id, selected }: ISelectAvatarProps) => {
	return (
		<button
			id={id}
			name="user_img"
			type="button"
			onClick={event => click(event)}
			className={`rounded ${selected && 'bg-gray3 ring-2 ring-white'}`}
		>
			<img
				id={id}
				//@ts-ignore
				name="user_img"
				onClick={event => click(event)}
				src={getImageByKey(`${id}`)}
			/>
		</button>
	)
}

export default SelectAvatar
