import React from "react"

const MenuBtn = ({ menuIsOpen, openMenu }) => {
	return (
		<button id="menu-btn" className={`menu-btn ${menuIsOpen && "open"}`} onClick={openMenu}>
			<div className="menu-btn_burger"></div>
		</button>
	)
}

export default MenuBtn
