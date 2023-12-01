import { useRef, useState } from 'react'

import IconBtn, { btnProps } from 'components/common/buttons/IconBtn'
import DeletePost from 'components/common/modals/DeletePost'

import { ICON_KEY } from 'utils/iconKey'

type Props = {
	children: React.ReactNode
	classList?: string
}
export default function Card({ children, classList }: Props) {
	return (
		<article
			className={`relative flex flex-wrap gap-x-2 rounded border border-solid border-white border-opacity-10 bg-gray2 p-3 sm:gap-x-4 sm:p-4 ${classList}`}
		>
			{children}
		</article>
	)
}
Card.Body = function CardBody(props: any) {
	return <div className="flex w-[calc(100%-80px)] flex-col gap-y-1">{props.children}</div>
}

type ActionProps = {
	like: btnProps['btnData']
	comment?: btnProps['btnData']
	delete?: { fn: () => void; label: string }
	showDelete: boolean
}
Card.Actions = function CardActions(props: ActionProps) {
	const [showPopup, setShowPopup] = useState(false)
	const buttonRef: React.MutableRefObject<HTMLButtonElement | undefined> = useRef()
	const focus = () => buttonRef.current?.focus()

	const deleteBtnData = {
		label: ICON_KEY.DELETE,
		content: '',
		action: () => {
			setShowPopup(true)
		},
		state: true,
		classList: 'absolute top-4 right-4',
	}

	return (
		<div className="flex gap-x-8">
			<IconBtn btnData={props.like} />
			{props.comment && <IconBtn btnData={props.comment} />}
			{props.showDelete && <IconBtn btnData={deleteBtnData} ref={buttonRef} />}
			{showPopup && (
				<DeletePost
					onClose={() => {
						setShowPopup(false)
						focus()
					}}
					onConfirm={() => props.delete!.fn()}
					label={props.delete!.label}
				/>
			)}
		</div>
	)
}
