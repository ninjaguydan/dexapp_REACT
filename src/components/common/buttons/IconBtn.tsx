import { forwardRef, useImperativeHandle, useRef } from 'react'

import {
	ChatOutline,
	Cross,
	Heart,
	HeartOutline,
	Star,
	StarOutline,
	Trash,
} from 'components/common/icons/index'

import { useAppSelector } from 'hooks/hooks'
import { selectCurrentUser } from 'redux/slices/authSlice'
import { ICON_KEY } from 'utils/iconKey'

export type btnProps = {
	btnData: {
		label: string
		content?: string | number
		action: () => void
		state?: boolean
		classList?: string
	}
}
const IconBtn = forwardRef(function IconBtn(
	{ btnData: { label, content, action, state, classList } }: btnProps,
	ref?,
) {
	const btnRef: React.MutableRefObject<HTMLButtonElement | undefined> = useRef()
	const currentUser = useAppSelector(selectCurrentUser)
	useImperativeHandle(
		ref,
		() => {
			return {
				focus() {
					btnRef.current!.focus()
				},
			}
		},
		[],
	)

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
			ref={btnRef as any}
			aria-label={label}
			className={`flex items-center gap-x-1 p-1 text-xs text-gray3 hover:text-secondary ${classList}`}
			onClick={action}
			disabled={!currentUser.userInfo}
		>
			{node}
			{content}
		</button>
	)
})
export default IconBtn
