import { FaCheckCircle } from 'components/common/icons/index'

type Props = {
	label: string
	name: string
	type?: string
	value: string
	handleChange: (e: any) => void
	error?: string
}
//TODO: change the way errors are handled
const FormInput = ({ label, name, type = 'text', value, handleChange, error = '' }: Props) => {
	return (
		<div className="relative">
			<label htmlFor={name}>{label}</label>
			{type === 'textArea' ? (
				<textarea
					id={name}
					className="w-full rounded border border-solid border-gray-300 px-3 py-1 text-gray2"
					rows={5}
					onChange={e => {
						handleChange(e)
					}}
					defaultValue={value}
				></textarea>
			) : (
				<input
					type={type}
					id={name}
					className="w-full rounded border border-solid border-gray-300 px-3 py-1 text-gray2"
					placeholder={label}
					value={value}
					onChange={e => {
						handleChange(e)
					}}
				/>
			)}
			{error && <p className="text-red-500">{error}</p>}
			{!error && value ? (
				<FaCheckCircle className="success absolute right-2 top-8 text-xl text-secondary" />
			) : null}
		</div>
	)
}

export default FormInput
