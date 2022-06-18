import "../../../css/Home.css"
import TopTenList from "./TopTenList"
import Timeline from "./Timeline"

const Home = () => {
	return (
		<div className="profile main">
			<TopTenList />
			<Timeline />
		</div>
	)
}

export default Home
