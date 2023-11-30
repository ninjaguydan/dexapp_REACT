import { useRef } from 'react'

import IconBtn, { btnProps } from 'components/common/buttons/IconBtn'

type Props = {
	children: React.ReactNode
	classList?: string
}
//TODO: Refactor to incorporate generic post buttons: LIKE, COMMENT, DELETE
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
	comment: btnProps['btnData']
	delete: btnProps['btnData']
	showDelete: boolean
}
Card.Actions = function CardActions(props: ActionProps) {
	const buttonRef: React.MutableRefObject<HTMLButtonElement | undefined> = useRef()
	const focus = () => buttonRef.current?.focus()

	return (
		<div className="flex gap-x-8">
			<IconBtn btnData={props.like} />
			<IconBtn btnData={props.comment} />
			{props.showDelete && <IconBtn btnData={props.delete} ref={buttonRef} />}
		</div>
	)
}
