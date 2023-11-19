import { useEffect, useState } from 'react'

import { HeartMinus, HeartPlus, Shield } from 'components/common/icons/index'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useSetResistance from 'hooks/fetchers/useSetResistance'

interface ITeamResistanceProps {
	team: number[]
}

export default function TeamResistance({ team }: ITeamResistanceProps) {
	const [showTable, setShowTable] = useState(true)
	const { resistanceTable: table } = useSetResistance(team)

	return (
		<ul className="relative h-[fit-content] w-full rounded border border-solid border-white border-opacity-10 bg-gray2">
			<li className="border-b border-solid border-white border-opacity-10 p-3 text-center sm:p-6">
				<h2 className="font-bold uppercase">Defensive Coverage</h2>
			</li>
			<li className="chart-container">
				<table className="w-full">
					<thead>
						<tr className="border-b border-solid border-gray3 bg-gray6">
							<th scope="col" className="pl-8 text-sm sm:text-base">
								Type
							</th>
							<th scope="col" className="px-3 py-2 text-red-500">
								<span className="sr-only">Weaknesses</span>
								<FontAwesomeIcon icon={HeartMinus} />
							</th>
							<th scope="col" className="px-3 py-2 text-greenLight">
								<span className="sr-only">Resistances</span>
								<FontAwesomeIcon icon={HeartPlus} />
							</th>
							<th scope="col" className="px-3 py-2 text-gray4">
								<span className="sr-only">Immunities</span>
								<FontAwesomeIcon icon={Shield} />
							</th>
						</tr>
					</thead>
					{showTable && (
						<tbody className="[&_tr:nth-child(even)]:bg-gray6">
							{Object.keys(table).map((pkmnType: string, i) => (
								<tr key={i}>
									<th
										scope="row"
										className="pl-8 text-sm capitalize sm:text-base"
									>
										{pkmnType}
									</th>
									{Object.values(table[pkmnType]).map((value, i) => (
										<td
											key={i}
											className={`px-3 py-1 text-gray4 sm:py-2 ${
												value > 3 ? 'text-base font-bold sm:text-xl' : ''
											} ${i === 1 && value > 2 ? 'text-greenLight' : ''} ${
												i === 0 && value > 2 ? 'text-red-500' : ''
											} ${value > 0 ? 'text-sm text-gray5' : ''}`}
										>
											{value === 0 ? '-' : value}
										</td>
									))}
								</tr>
							))}
						</tbody>
					)}
				</table>
			</li>
			<li
				className="border-b border-solid border-white border-opacity-10 p-3 px-8 text-center sm:p-6 sm:px-6"
				id="toggle-weakness"
			>
				<button
					className="w-full rounded border border-solid px-8 py-1 text-xs hover:bg-gray3"
					onClick={() => {
						setShowTable(!showTable)
					}}
				>
					Hide/Display Resistances
				</button>
			</li>
		</ul>
	)
}
