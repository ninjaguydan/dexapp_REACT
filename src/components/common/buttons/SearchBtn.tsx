import useDeviceWidth from 'hooks/useDeviceWidth'

type Props = {
	action: () => void
}

const SearchBtn = ({ action }: Props) => {
	// const breakpoint = useDeviceWidth()

	// if (breakpoint === 'DESKTOP') return <></>
	return (
		<button aria-label="search button" className="flex hover:text-secondary" onClick={action}>
			<i className="material-icons" aria-hidden="true">
				search
			</i>
		</button>
	)
}

export default SearchBtn
