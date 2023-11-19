type Props = {
	children: React.ReactNode
	classList?: string
}

export default function ListItem({ children, classList }: Props) {
	return (
		<li
			className={`${classList} flex justify-between border-b border-solid border-white border-opacity-10 px-8 py-2 text-xs sm:px-6 sm:text-sm`}
		>
			{children}
		</li>
	)
}
