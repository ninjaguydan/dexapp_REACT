import React from "react"

const SearchBtn = ({ toggleSearch }) => {
	return (
		<button className="nav-icon search-icon" onClick={toggleSearch}>
			<i className="material-icons" aria-hidden="true">
				search
			</i>
			<span className="sr-only">toggle search bar</span>
		</button>
	)
}

export default SearchBtn
