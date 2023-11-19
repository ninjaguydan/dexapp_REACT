import React, { createContext, forwardRef, useContext } from 'react'

type Props = {
	children: React.ReactNode
	classList?: string
}
const inputStyle: string = 'w-full py-1 px-3 rounded text-gray2 border border-solid border-gray-300'

const InputContext = createContext({
	classList: '',
})

export default function FormRow({ children, classList = inputStyle }: Props) {
	return (
		<div className="relative">
			<InputContext.Provider value={{ classList }}>{children}</InputContext.Provider>
		</div>
	)
}

FormRow.Text = forwardRef(function FormRowText(props: any, ref?) {
	const { classList } = useContext(InputContext)
	return (
		<>
			<label htmlFor="">{props.children}</label>
			<input
				className={classList}
				ref={ref as any}
				type="text"
				placeholder={props.children}
			/>
		</>
	)
})

FormRow.Password = forwardRef(function FormRowPassword(props: any, ref?) {
	const { classList } = useContext(InputContext)
	return (
		<>
			<label htmlFor="">{props.children}</label>
			<input
				className={classList}
				ref={ref as any}
				type="password"
				placeholder={props.children}
			/>
		</>
	)
})
