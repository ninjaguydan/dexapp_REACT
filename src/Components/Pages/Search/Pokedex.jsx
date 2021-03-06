import Results from "./Results"
import { titleCase } from "../../../Helpers/Helpers"
import usePokemon from "../../../CustomHooks/usePokemon"
import useTypes from "../../../CustomHooks/useTypes"
import { useState } from "react"

const Pokedex = () => {
	const { data: results, isLoading } = usePokemon()
	const { data: types, loadingTypes } = useTypes()
	const [params, setParams] = useState({
		gen: "All",
		type: "All",
	})
	function handleChange(e) {
		setParams({
			...params,
			[e.target.id]: e.target.value,
		})
	}
	return (
		<>
			<h2 className="header1 title">Pokedex</h2>
			<form className="filter-form">
				<label htmlFor="gen">Generation</label>
				<select id="gen" className="form-control-custom" value={params.gen} onChange={(e) => handleChange(e)}>
					<option>All</option>
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
					<option>6</option>
					<option>7</option>
					<option>8</option>
				</select>
				<label htmlFor="type">Type</label>
				<select id="type" className="form-control-custom" value={params.type} onChange={(e) => handleChange(e)}>
					<option>All</option>
					{!loadingTypes && types.map((type) => <option key={type.id}>{titleCase(type.name)}</option>)}
				</select>
				{/* <button className="btn secondary">Filter</button> */}
			</form>
			<Results results={results} isLoading={isLoading} params={params} />
		</>
	)
}

export default Pokedex
