import generateTimeline from "../../../Helpers/generateTimeline"
import TimelineCard from "./TimelineCard"
import PostForm from "../../Forms/PostForm"
import { useSelector } from "react-redux"

function Timeline() {
	const posts = useSelector((state) => state.posts)
	const reviews = useSelector((state) => state.reviews)
	const teams = useSelector((state) => state.teams)
	const timeline = generateTimeline(posts, reviews, teams)
	const loggedUser = useSelector((state) => state.loggedUser)

	return (
		<div className="post-column main">
			{loggedUser && <PostForm btnText={"Post"} placeholder={"What's on your mind?"} />}
			{timeline.length === 0 ? (
				<div className="card">Nothing to show!</div>
			) : (
				timeline.map((item, index) => {
					return <TimelineCard data={item} review={item.rating} team={item.name} key={index + 1} />
				})
			)}
		</div>
	)
}

export default Timeline
