import Post from "../../Pages/Profile/Post"
import Review from "../../Pages/Pokemon/Review"
import Team from "../Teams/Team"

function TimelineCard({ review = false, team = false, data }) {
	if (review) {
		return <Review review={data} TL_view={true} />
	}
	if (team) {
		return <Team team={data} />
	}

	return <Post post={data} />
}

export default TimelineCard
