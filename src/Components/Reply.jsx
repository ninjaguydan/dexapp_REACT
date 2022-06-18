import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { FaRegHeart, FaHeart, FaTrash } from "react-icons/fa"
import { getTimeDifference, truncateStr } from "../Helpers/Helpers"
import UserIcon from "./Navigation/UserIcon"

function Reply({ reply }) {
	let dispatch = useDispatch()
	let user = useSelector((state) => state.users.filter((user) => user.id === reply.added_by)[0])
	let likes = useSelector((state) => state.likes.filter((like) => like.postType === "reply" && like.forId === reply.id))
	let loggedUser = useSelector((state) => state.loggedUser)

	function toggleLike() {
		if (!loggedUser) {
			return
		}
		if (likes.find((like) => like.user === loggedUser.id)) {
			let toDel = { name: "reply", forId: reply.id, user: loggedUser.id }
			dispatch({ type: "users/UNLIKE", toDel })
		} else {
			let newLike = { postType: "reply", user: loggedUser.id, forId: reply.id }
			dispatch({ type: "users/LIKE", newLike })
		}
	}

	return (
		<div className="card">
			<UserIcon userImg={user.user_img} userName={user.username} userColor={user.bg_color} />
			<div className="content">
				<h4>
					<Link to={`/profile/${user.username}`}>{truncateStr(user.name)}</Link>
					<span> {truncateStr(user.username)}</span>
					<span className="date"> &#8226; {getTimeDifference(reply.created)}</span>
					{loggedUser?.id === reply.added_by && (
						<button className="trash" onClick={() => dispatch({ type: "reply/DELETE", replyId: reply.id })}>
							<FaTrash />
						</button>
					)}
				</h4>
				<p>{reply.content}</p>
			</div>
			<div className="icon-container">
				<button className="fav" onClick={() => toggleLike()}>
					{loggedUser && likes.find((like) => like.user === loggedUser.id) ? <FaHeart style={{ color: "#009df1" }} /> : <FaRegHeart />}
					{likes.length}
				</button>
			</div>
		</div>
	)
}

export default Reply
