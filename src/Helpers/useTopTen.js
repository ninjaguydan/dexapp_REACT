import { useEffect, useState } from "react"

const useTopTen = (arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) => {
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			const data1 = await fetch(`http://localhost:8000/api/pokemon/${arr[0]}`)
			const json1 = await data1.json()

			const data2 = await fetch(`http://localhost:8000/api/pokemon/${arr[1]}`)
			const json2 = await data2.json()

			const data3 = await fetch(`http://localhost:8000/api/pokemon/${arr[2]}`)
			const json3 = await data3.json()

			const data4 = await fetch(`http://localhost:8000/api/pokemon/${arr[3]}`)
			const json4 = await data4.json()

			const data5 = await fetch(`http://localhost:8000/api/pokemon/${arr[4]}`)
			const json5 = await data5.json()

			const data6 = await fetch(`http://localhost:8000/api/pokemon/${arr[5]}`)
			const json6 = await data6.json()

			const data7 = await fetch(`http://localhost:8000/api/pokemon/${arr[6]}`)
			const json7 = await data7.json()

			const data8 = await fetch(`http://localhost:8000/api/pokemon/${arr[7]}`)
			const json8 = await data8.json()

			const data9 = await fetch(`http://localhost:8000/api/pokemon/${arr[8]}`)
			const json9 = await data9.json()

			const data10 = await fetch(`http://localhost:8000/api/pokemon/${arr[9]}`)
			const json10 = await data10.json()

			setData([json1, json2, json3, json4, json5, json6, json7, json8, json9, json10])
			setIsLoading(false)
		}
		fetchData().catch((error) => {
			console.error(error)
			setIsLoading(false)
		})
	}, [])

	return { data, isLoading }
}
export default useTopTen
