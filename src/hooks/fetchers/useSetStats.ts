import { useEffect, useState } from 'react'

import { PKMN_API } from 'api/urls'
import useSWR from 'swr'
import { getBaseStatTotal } from 'utils/Helpers'
import { ISTable, PKMN_JSON } from 'utils/Interfaces'

const initSTable = {
	'Total Average': 0,
	'Avg HP': 0,
	'Avg Attack': 0,
	'Avg Defense': 0,
	'Avg Special Attack': 0,
	'Avg Special Defense': 0,
	'Avg Speed': 0,
}

function fetchStats(urls: string[]): Promise<PKMN_JSON[]> {
	const fetcher = (url: string) => fetch(url).then(response => response.json())
	return Promise.all(urls.map(url => fetcher(url)))
}

export default function useSetStats(team_members: number[]) {
	const [statTable, setStatTable] = useState<ISTable>(initSTable)
	const urls = team_members.map(member => PKMN_API + `/${member}`)
	const { data, isLoading, error } = useSWR(urls, fetchStats)

	useEffect(() => {
		if (!isLoading) {
			let base_total = 0
			let hp_total = 0
			let atk_total = 0
			let def_total = 0
			let spatk_total = 0
			let spdef_total = 0
			let spd_total = 0

			data!.forEach(pokemon => {
				base_total += getBaseStatTotal([
					pokemon.stats[0].base_stat,
					pokemon.stats[1].base_stat,
					pokemon.stats[2].base_stat,
					pokemon.stats[3].base_stat,
					pokemon.stats[4].base_stat,
					pokemon.stats[5].base_stat,
				])

				hp_total += pokemon.stats[0].base_stat
				atk_total += pokemon.stats[1].base_stat
				def_total += pokemon.stats[2].base_stat
				spatk_total += pokemon.stats[3].base_stat
				spdef_total += pokemon.stats[4].base_stat
				spd_total += pokemon.stats[5].base_stat
			})
			setStatTable({
				'Total Average': Math.floor(base_total / 6),
				'Avg HP': Math.floor(hp_total / 6),
				'Avg Attack': Math.floor(atk_total / 6),
				'Avg Defense': Math.floor(def_total / 6),
				'Avg Special Attack': Math.floor(spatk_total / 6),
				'Avg Special Defense': Math.floor(spdef_total / 6),
				'Avg Speed': Math.floor(spd_total / 6),
			})
		}
	}, [isLoading])

	return {
		statTable,
	}
}
