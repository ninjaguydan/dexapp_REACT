import { useState } from 'react'

const SearchBtn = () => {
	const [showSearchBar, setShowSearchBar] = useState(false)

	return (
		<>
			<button
				className="nav-icon search-icon"
				onClick={() => setShowSearchBar(!showSearchBar)}
			>
				<i className="material-icons" aria-hidden="true">
					search
				</i>
				<span className="sr-only">toggle search bar</span>
			</button>
		</>
	)
}

export default SearchBtn
