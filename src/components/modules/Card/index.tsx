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
