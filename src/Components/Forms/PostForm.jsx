import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { useSelector } from "react-redux"
import getImageByKey from "../../Helpers/getImageByKey"

const empty = {
	content: "",
	rating: 1,
}

function PostForm({ btnText, placeholder, type = { name: "POST" } }) {
	const [counter, setCounter] = useState(0)
	const [formData, setFormData] = useState(empty)
	const loggedUser = useSelector((state) => state.loggedUser)
	const dispatch = useDispatch()

	function setValue(event) {
		setFormData({ ...formData, [event.target.id]: event.target.value })
	}
	function enableButton() {
		if (counter > 1 && counter < 141) {
			return true
		} else {
			return false
		}
	}

	useEffect(() => {
		setCounter(formData.content.length)
	}, [formData.content])

	function onSubmit(event) {
		event.preventDefault()
		let newPost = {
			id: uuidv4(),
			content: formData.content,
			created: new Date().getTime(),
			added_by: loggedUser.id,
			likes: [],
		}
		switch (type.name) {
			case "REVIEW":
				let newReview = {
					...newPost,
					rating: formData.rating,
					pkmn: type.id,
				}
				dispatch({ type: "review/CREATE", newReview })
				break
			case "REPLY":
				let newReply = {
					...newPost,
					forId: type.for.id,
				}
				switch (type.for.name) {
					case "review":
						newReply["for"] = "review"
						break
					case "team":
						newReply["for"] = "team"
						break
					default:
						newReply["for"] = "post"
				}
				dispatch({ type: "reply/CREATE", newReply })
				break
			default:
				dispatch({ type: "post/CREATE", newPost })
		}
		setFormData(empty)
	}

	return (
		<div className="card">
			<img src={getImageByKey(loggedUser.user_img)} alt={"user"} className={loggedUser.bg_color} />
			<form onSubmit={(e) => onSubmit(e)}>
				<textarea
					onChange={(e) => setValue(e)}
					value={formData.content}
					id="content"
					className="form-control form-control-custom"
					rows={2}
					placeholder={placeholder}
				></textarea>
				{type.name === "REVIEW" && (
					<select className="form-control-custom" id="rating" value={formData.rating} onChange={(e) => setValue(e)}>
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
						<option>6</option>
						<option>7</option>
						<option>8</option>
						<option>9</option>
						<option>10</option>
					</select>
				)}
				<button className="btn primary" disabled={enableButton() ? "" : "disabled"}>
					{btnText}
				</button>
				<span className={`counter ${counter > 140 && "error"} ${counter > 100 && "caution"}`}>{counter}/140</span>
			</form>
		</div>
	)
}

export default PostForm
