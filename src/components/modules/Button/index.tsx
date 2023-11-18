import { createContext, forwardRef, useContext, useImperativeHandle, useRef } from 'react'

type Props = {
	action?: () => void
	children?: React.ReactNode
	isDisabled?: boolean
	classList?: string
}

const ButtonContext = createContext({
	isDisabled: false,
})

export default function Button({ children, action, isDisabled = false }: Props) {
	return <ButtonContext.Provider value={{ isDisabled }}>{children}</ButtonContext.Provider>
}

Button.Primary = forwardRef(function ButtonPrimary(
	{ children, action = () => {}, isDisabled, classList }: Props,
	ref?,
) {
	return (
		<button
			className={`w-full rounded bg-primary p-1 text-white hover:bg-primaryDark disabled:opacity-50 ${classList}`}
			onClick={() => action()}
			disabled={isDisabled}
		>
			{children}
		</button>
	)
})

Button.Secondary = forwardRef(function ButtonSecondary(
	{ children, action = () => {}, isDisabled, classList }: Props,
	ref?,
) {
	const btnRef: React.MutableRefObject<HTMLButtonElement | undefined> = useRef()
	useImperativeHandle(
		ref, //forwarded ref
		function () {
			return {
				focus() {
					btnRef.current!.focus()
				},
			} // forwarded ref value
		},
		[],
	)

	return (
		<button
			ref={btnRef as any}
			type="button"
			className={`w-full rounded border border-solid border-white p-1 text-white hover:bg-[#3d3c44] disabled:opacity-50 ${classList}`}
			onClick={() => action()}
			disabled={isDisabled}
		>
			{children}
		</button>
	)
})
