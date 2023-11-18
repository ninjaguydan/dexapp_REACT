import {
	ChatOutline,
	Cross,
	Heart,
	HeartOutline,
	Star,
	StarOutline,
	Trash,
} from 'components/common/icons/index'

import { ICON_KEY } from 'utils/iconKey'

type Props = {
	btnData: {
		label: string
		content?: string | number
		action: () => void
		state?: boolean
		classList?: string
	}
}
function IconBtn({ btnData: { label, content, action, state, classList } }: Props) {
	let node = <></>

	if (label === ICON_KEY.LIKES) {
		node = state ? <Heart className="text-secondary" /> : <HeartOutline />
	}
	if (label === ICON_KEY.FAVORITE) {
		node = state ? <Star /> : <StarOutline />
	}
	if (label === ICON_KEY.COMMENTS) {
		node = <ChatOutline />
	}
	if (label === ICON_KEY.DELETE) {
		node = <Trash className="hover:text-primary" />
	}
	if (label === ICON_KEY.CLOSE) {
		node = <Cross />
	}

	return (
		<button
			aria-label={label}
			className={`flex items-center gap-x-1 p-1 text-xs text-gray3 hover:text-secondary ${classList}`}
			onClick={action}
		>
			{node}
			{content}
		</button>
	)
}
export default IconBtn
