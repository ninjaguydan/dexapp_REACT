type Props = {
	action: () => void
	label: string
	isActive?: boolean
}
export default function ProfileTab({ action, label, isActive = false }: Props) {
	return (
		<button
			onClick={action}
			className={`w-full rounded-t border border-solid border-white border-opacity-10 ${
				isActive ? 'bg-gray2' : 'bg-gray1 text-gray4 hover:text-gray5'
			} p-3 sm:p-4`}
		>
			{label}
		</button>
	)
}
