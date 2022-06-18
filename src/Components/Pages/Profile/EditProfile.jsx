import { useState } from "react"
import ProfileIcon from "../../Buttons/ProfileIcon"
import ProfileColor from "../../Buttons/ProfileColor"
import FormInput from "../../Forms/FormInput"
import { useDispatch, useSelector } from "react-redux"

function EditProfile({ closeEdit }) {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.loggedUser)
	const [formData, setFormData] = useState({
		name: user.name,
		location: user?.location,
		bio: user?.bio,
		user_img: user.user_img,
		bg_color: user.bg_color,
	})

	function updateProfile(event) {
		event.preventDefault()
		closeEdit()
		dispatch({ type: "users/UPDATE", formData, userId: user.id })
	}
	function handleChange(event) {
		setFormData({
			...formData,
			[event.target.id]: event.target.value,
		})
	}
	function clickIcon(event) {
		switch (event.target.tagName) {
			case "BUTTON": //when clicked with keyboard "ENTER"
				setFormData({
					...formData,
					[event.target.children[0].name]: event.target.children[0].id,
				})
				break
			default: // when clicked with mouse
				setFormData({
					...formData,
					[event.target.name]: event.target.id,
				})
		}
	}
	function clickColor(event) {
		setFormData({
			...formData,
			[event.target.name]: event.target.id,
		})
	}

	return (
		<div className="modal-bg">
			<div className="edit-profile-modal">
				<div className="modal-head">
					<h2 className="header1">Edit Profile</h2>
					<button onClick={closeEdit} className="close">
						&#10005;
					</button>
				</div>
				<hr />
				<form onSubmit={(e) => updateProfile(e)}>
					<FormInput name="name" label="Name" value={formData.name} error={true} handleChange={handleChange} />
					<FormInput name="location" label="Location" value={formData.location || ""} error={true} handleChange={handleChange} />
					<FormInput name="bio" label="Bio" textArea={true} value={formData.bio || ""} error={true} handleChange={handleChange} />
					<hr />
					<h3>Choose profile photo</h3>
					<div className="img-container">
						<ProfileIcon click={clickIcon} id="m1" selected={formData.user_img === "m1"} />
						<ProfileIcon click={clickIcon} id="m4" selected={formData.user_img === "m4"} />
						<ProfileIcon click={clickIcon} id="m2" selected={formData.user_img === "m2"} />
						<ProfileIcon click={clickIcon} id="m3" selected={formData.user_img === "m3"} />
						<ProfileIcon click={clickIcon} id="f1" selected={formData.user_img === "f1"} />
						<ProfileIcon click={clickIcon} id="f4" selected={formData.user_img === "f4"} />
						<ProfileIcon click={clickIcon} id="f2" selected={formData.user_img === "f2"} />
						<ProfileIcon click={clickIcon} id="f3" selected={formData.user_img === "f3"} />
					</div>
					<hr />
					<h3>Choose background color</h3>
					<div className="img-container colors">
						<ProfileColor color="gray" click={clickColor} selected={formData.bg_color === "gray"} />
						<ProfileColor color="red" click={clickColor} selected={formData.bg_color === "red"} />
						<ProfileColor color="blue" click={clickColor} selected={formData.bg_color === "blue"} />
						<ProfileColor color="green" click={clickColor} selected={formData.bg_color === "green"} />
						<ProfileColor color="yellow" click={clickColor} selected={formData.bg_color === "yellow"} />
						<ProfileColor color="purple" click={clickColor} selected={formData.bg_color === "purple"} />
					</div>
					<hr />
					<br />
					<button className="btn primary">Update</button>
				</form>
				<button className="btn secondary btn-del">Delete Profile</button>
			</div>
		</div>
	)
}

export default EditProfile
