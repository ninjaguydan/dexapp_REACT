import { useState } from 'react'

import Button from 'components/modules/Button'

import useDeviceWidth from 'hooks/useDeviceWidth'

type Props = {
	show?: boolean
	classList?: string
}
const SearchBar = ({ show = true, classList }: Props) => {
	// const [breakpoint] = useDeviceWidth()
	const [q, setQ] = useState('')

	// if (breakpoint !== 'DESKTOP') return <></>

	return (
		<>
			{show && (
				<form className={`flex w-full bg-gray2 p-2 ${classList}`}>
					<input
						type="search"
						value={q}
						onChange={e => setQ(e.target.value)}
						className="w-full rounded-l-full bg-gray1 px-4"
						placeholder="Search DexApp..."
					/>
					<Button.Secondary classList="w-[fit-content] px-4 rounded-none rounded-r-full border-gray1 text-[#ced4da]">
						Search
					</Button.Secondary>
				</form>
			)}
		</>
	)
}

export default SearchBar
