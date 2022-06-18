import { Link } from "react-router-dom"
import { makeHundreds } from "../../Helpers/Helpers"

const ResultCard = (props) => {
	return (
		<Link to={`/pokemon/${props.id}`}>
			<div className="card">
				<p>#{makeHundreds(props.id)}</p>
				<img src={props.art_url} alt={`${props.name}'s official artwork`} />
				<p>{props.name}</p>
			</div>
		</Link>
	)
}

export default ResultCard
