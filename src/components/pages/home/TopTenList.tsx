import { memo } from 'react'

import TopTenCard from 'components/pages/home/TopTenCard'

import { getRandomInt } from 'utils/Helpers'

let arr: number[] = []
while (arr.length < 10) {
	arr.push(getRandomInt(1, 1017))
}

function TopTenList() {
	return (
		<ol
			className="relative flex w-full max-w-2xl overflow-auto rounded border border-solid border-white border-opacity-10 bg-gray2 lg:max-w-sm lg:flex-col lg:overflow-visible"
			id="style-4"
		>
			<li className="flex items-center border border-solid border-white border-opacity-10 p-4">
				<h2 className="whitespace-nowrap text-xl font-bold sm:text-3xl">Top 10</h2>
			</li>
			{arr.map((id, index) => {
				return <TopTenCard id={id} key={index} />
			})}
		</ol>
	)
}

export default memo(TopTenList)
