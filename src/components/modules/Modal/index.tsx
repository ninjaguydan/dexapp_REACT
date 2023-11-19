import { createContext, createRef, useContext, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import Button from 'components/modules/Button'

import handleTabKey from './utils/handleTabKey'

type Props = {
	closeModal: () => void
	onConfirm?: () => void
	children: React.ReactNode
	classList?: string
}

const ModalContext = createContext({
	closeModal: () => {},
	onConfirm: () => {},
})

function clickedOutside(event: PointerEvent, element: React.MutableRefObject<Element | undefined>) {
	if (event.pointerType === '') return

	const elementDimensions = element.current!.getBoundingClientRect()
	if (
		event.clientX < elementDimensions.left ||
		event.clientX > elementDimensions.right ||
		event.clientY < elementDimensions.top ||
		event.clientY > elementDimensions.bottom
	) {
		return true
	} else {
		return false
	}
}

export default function Modal({ children, closeModal, onConfirm = () => {}, classList }: Props) {
	const modalRef: React.MutableRefObject<HTMLElement | undefined> = useRef()
	const keyListenersMap: Map<
		number,
		(e: KeyboardEvent, modalRef: React.MutableRefObject<Element | undefined>) => void
	> = new Map([
		[27, closeModal],
		[9, handleTabKey],
	])

	// register a "keydown" listener for mapped key codes. Runs function of corresponding key if it exists
	useEffect(() => {
		function keyListener(e: KeyboardEvent) {
			const listener = keyListenersMap.get(e.keyCode)
			return listener && listener(e, modalRef)
		}
		document.addEventListener('keydown', keyListener)
		return () => document.removeEventListener('keydown', keyListener)
	})

	useEffect(() => {
		function modalHandler(e: any) {
			if (clickedOutside(e, modalRef)) {
				closeModal()
			}
		}
		document.addEventListener('click', modalHandler, true)
		return () => document.removeEventListener('click', modalHandler, true)
	})

	return createPortal(
		<div
			className={`fixed left-0 top-0 z-20 block flex h-full w-full overflow-auto bg-black_80 p-4 backdrop-blur-sm ${classList}`}
			aria-modal="true"
		>
			<figure
				className="m-auto flex w-full max-w-lg flex-col gap-y-2 rounded bg-gray2 p-4 sm:p-6"
				ref={modalRef as any}
			>
				<ModalContext.Provider value={{ closeModal, onConfirm }}>
					{children}
				</ModalContext.Provider>
			</figure>
		</div>,
		document.body,
	)
}

Modal.Header = function ModalHeader(props: any) {
	const { closeModal } = useContext(ModalContext)

	return (
		<>
			<header className="flex items-center justify-between pb-1">
				<h2 className="text-xl font-medium">{props.children}</h2>
				<button
					onClick={() => closeModal()}
					className="rounded px-2 text-2xl text-gray5 hover:bg-[#383838]"
					autoFocus
				>
					&#10005;
				</button>
			</header>
			<hr />
		</>
	)
}

Modal.Body = function ModalBody(props: any) {
	return <main>{props.children}</main>
}

Modal.Footer = function ModalFooter(props: any) {
	const { closeModal, onConfirm } = useContext(ModalContext)
	return (
		<footer className="flex flex-col items-center gap-4 xsm:flex-row-reverse ">
			<Button.Primary
				action={() => {
					onConfirm()
					closeModal()
				}}
			>
				{props.children}
			</Button.Primary>
			<Button.Secondary
				action={() => {
					closeModal()
				}}
			>
				Cancel
			</Button.Secondary>
		</footer>
	)
}
