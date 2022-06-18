import ReplyList from "../../ReplyList"
import { Link } from "react-router-dom"
import { getTimeDifference, truncateStr } from "../../../Helpers/Helpers"
import { useState } from "react"
import { FaRegHeart, FaHeart, FaRegCommentAlt, FaTrash } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import UserIcon from "../../Navigation/UserIcon"

function Post({ post }) {
	const [repliesVisible, setRepliesVisible] = useState(false)
	const replies = useSelector((state) => state.replies.filter((reply) => reply.for === "post" && reply.forId === post.id))
	let user = useSelector((state) => state.users.filter((user) => user.id === post.added_by)[0])
	let likes = useSelector((state) => state.likes.filter((like) => like.postType === "post" && like.forId === post.id))
	let loggedUser = useSelector((state) => state.loggedUser)
	let dispatch = useDispatch()

	function toggleLike() {
		if (!loggedUser) {
			return
		}
		if (likes.find((like) => like.user === loggedUser.id)) {
			let toDel = { name: "post", forId: post.id, user: loggedUser.id }
			dispatch({ type: "users/UNLIKE", toDel })
		} else {
			let newLike = { postType: "post", user: loggedUser.id, forId: post.id }
			dispatch({ type: "users/LIKE", newLike })
		}
	}

	return (
		<div className="card">
			<UserIcon userImg={user.user_img} userName={user.username} userColor={user.bg_color} />
			<div className="content">
				<h4>
					<Link to={`/profile/${truncateStr(user.username)}`}>{truncateStr(user.name)}</Link>
					<span> {truncateStr(user.username)}</span>
					<span className="date"> &#8226; {getTimeDifference(post.created)}</span>
					{loggedUser?.id === post.added_by && (
						<button className="trash" onClick={() => dispatch({ type: "post/DELETE", postId: post.id })}>
							<FaTrash />
						</button>
					)}
				</h4>
				<p>{post.content}</p>
			</div>
			<div className="icon-container">
				<button className="fav" onClick={() => toggleLike()}>
					{loggedUser && likes.find((like) => like.user === loggedUser.id) ? <FaHeart style={{ color: "#009df1" }} /> : <FaRegHeart />}
					{likes.length}
				</button>
				<button
					className="fav"
					onClick={() => {
						setRepliesVisible(!repliesVisible)
					}}
				>
					<FaRegCommentAlt /> {replies.length}
				</button>
			</div>
			<div className="replies">
				{repliesVisible && <ReplyList replies={replies} user={user.username} kind={{ name: "post", id: post.id }} />}
			</div>
		</div>
	)
}

export default Post
