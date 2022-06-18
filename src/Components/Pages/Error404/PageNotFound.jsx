import error_img from "../../../media/404.png"
import { useNavigate } from "react-router-dom"

const PageNotFound = () => {
	const navigate = useNavigate()

	function goHome() {
		navigate("/")
	}

	return (
		<div className="error404">
			<div className="img-box">
				<img src={error_img} />
				<span>404</span>
			</div>
			<h2 className="header1">Oops! Page not found</h2>
			<p>You shouldn't be here. If you don't go home immediately, Mimikyu might show you its face...</p>
			<button
				onClick={() => {
					goHome()
				}}
				className="btn primary"
			>
				Take me home now
			</button>
		</div>
	)
}

export default PageNotFound
