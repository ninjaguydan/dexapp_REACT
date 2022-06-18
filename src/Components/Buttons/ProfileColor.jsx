import React from "react"

const ProfileColor = ({ selected, click, color }) => {
	return (
		<button type="button" className={`${color} ${selected && "selected"}`} onClick={(event) => click(event)} name="bg_color" id={color}></button>
	)
}

export default ProfileColor
