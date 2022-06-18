import ReplyList from "../../ReplyList"
import Loading from "../../Loader/Loading"
import UserIcon from "../../Navigation/UserIcon"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { Link } from "react-router-dom"
import { FaStar, FaRegStar, FaHeart, FaRegHeart, FaRegCommentAlt, FaTrash } from "react-icons/fa"
import { getTimeDifference, titleCase, truncateStr } from "../../../Helpers/Helpers"
import usePokemon from "../../../CustomHooks/usePokemon"

const Review = ({ review, TL_view = false }) => {
	let dispatch = useDispatch()
	const [repliesVisible, setRepliesVisible] = useState(false)
	const replies = useSelector((state) => state.replies.filter((reply) => reply.for === "review" && reply.forId === review.id))
	const arr = [...Array(10).keys()]
	let user = useSelector((state) => state.users.filter((user) => user.id === review.added_by)[0])
	let likes = useSelector((state) => state.likes.filter((like) => like.postType === "review" && like.forId === review.id))
	let loggedUser = useSelector((state) => state.loggedUser)
	const { data: pkmn, isLoading } = usePokemon(review.pkmn)

	function toggleLike() {
		if (!loggedUser) {
			return
		}
		if (likes.find((like) => like.user === loggedUser.id)) {
			let toDel = { name: "review", forId: review.id, user: loggedUser.id }
			dispatch({ type: "users/UNLIKE", toDel })
		} else {
			let newLike = { postType: "review", user: loggedUser.id, forId: review.id }
			dispatch({ type: "users/LIKE", newLike })
		}
	}

	if (isLoading) {
		return <Loading />
	}

	return (
		<div className="card">
			{TL_view ? (
				<img src={pkmn.sprite_url} alt={`${pkmn.name}'s official sprite`} style={{ backgroundColor: "#444" }} />
			) : (
				<UserIcon userImg={user.user_img} userName={user.username} userColor={user.bg_color} />
			)}

			<div className="content">
				<h4>
					<Link to={`/profile/${user.username}`}>{TL_view ? truncateStr(user.username) : truncateStr(user.name)}</Link>
					<span> {TL_view ? "reviewed" : truncateStr(user.username)}</span>
					{TL_view && <Link to={`/pokemon/${pkmn.id}`}> {titleCase(pkmn.name)}</Link>}
					<span className="date"> &#8226; {getTimeDifference(review.created)}</span>
					{loggedUser.id === review.added_by && (
						<button className="trash" onClick={() => dispatch({ type: "review/DELETE", reviewId: review.id })}>
							<FaTrash />
						</button>
					)}
				</h4>
				<span className="rating">
					{arr.map((value, index) => {
						if (review.rating < index + 1) {
							return <FaRegStar key={index} />
						} else {
							return <FaStar key={index} />
						}
					})}
				</span>
				<p>{review.content}</p>
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
				{repliesVisible && <ReplyList replies={replies} user={user.username} kind={{ name: "review", id: review.id }} />}
			</div>
		</div>
	)
}

export default Review
