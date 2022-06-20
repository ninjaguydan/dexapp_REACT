import { useEffect, useState } from "react"

const usePokemon = (id = "") => {
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetch(`https://dexapp-api.herokuapp.com/pokemon/${id}`)
			.then((response) => {
				if (!response.ok) {
					throw Error("Could not fetch Pokemon data")
				}
				return response.json()
			})
			.then((json) => {
				setData(json)
				setIsLoading(false)
			})
			.catch((error) => {
				console.log(error.message)
				// setIsLoading(false)
			})
	}, [id])

	return { data, isLoading }
}
export default usePokemon
