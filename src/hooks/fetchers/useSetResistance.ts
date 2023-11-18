import { useEffect, useState } from 'react'

import { PKMN_API, TYPE_API } from 'api/urls'
import useSWR from 'swr'
import { IRTable, PKMN_JSON, TYPE_JSON, TYPE_LIST, table as initTable } from 'utils/Interfaces'
import { setRelations } from 'utils/setRelations'

const fetcher = (url: string) => fetch(url).then(response => response.json())

function typeFetcher(urls: string[]): Promise<TYPE_JSON[]> {
	return Promise.all(urls.map(url => fetcher(url)))
}
function pkmnFetcher(urls: string[]): Promise<PKMN_JSON[]> {
	return Promise.all(urls.map(url => fetcher(url)))
}

export default function useSetResistance(team_members: number[]) {
	const [loadingTable, setLoadingTable] = useState(true)
	const [resistanceTable, setResistanceTable] = useState<IRTable>(initTable)
	const pkmn_urls = team_members.map(member => PKMN_API + `/${member}`)
	const type_urls = Object.values(TYPE_LIST).map(type => TYPE_API + `/${type}`)
	const { data: typeData, isLoading: typeLoading } = useSWR(type_urls, typeFetcher)
	const { data: pkmnData, isLoading: pkmnLoading } = useSWR(pkmn_urls, pkmnFetcher)

	useEffect(() => {
		if (!typeLoading && !pkmnLoading) {
			let table: IRTable = {
				normal: { weak: 0, resist: 0, immune: 0 },
				fighting: { weak: 0, resist: 0, immune: 0 },
				flying: { weak: 0, resist: 0, immune: 0 },
				poison: { weak: 0, resist: 0, immune: 0 },
				ground: { weak: 0, resist: 0, immune: 0 },
				rock: { weak: 0, resist: 0, immune: 0 },
				bug: { weak: 0, resist: 0, immune: 0 },
				ghost: { weak: 0, resist: 0, immune: 0 },
				steel: { weak: 0, resist: 0, immune: 0 },
				fire: { weak: 0, resist: 0, immune: 0 },
				water: { weak: 0, resist: 0, immune: 0 },
				grass: { weak: 0, resist: 0, immune: 0 },
				electric: { weak: 0, resist: 0, immune: 0 },
				psychic: { weak: 0, resist: 0, immune: 0 },
				ice: { weak: 0, resist: 0, immune: 0 },
				dragon: { weak: 0, resist: 0, immune: 0 },
				dark: { weak: 0, resist: 0, immune: 0 },
				fairy: { weak: 0, resist: 0, immune: 0 },
			}
			pkmnData?.forEach((pokemon, index) => {
				let types: string[] = [pokemon.types[0].type.name, pokemon.types[1]?.type.name]
				let {
					weaknesses: weak_to,
					resistances: resists,
					immunities: immune_to,
				} = setRelations(types, typeData!)
				for (let weakness of weak_to) {
					table = {
						...table,
						[weakness]: {
							...table[weakness],
							weak: (table[weakness].weak += 1),
						},
					}
				}
				for (let resistance of resists) {
					table = {
						...table,
						[resistance]: {
							...table[resistance],
							resist: (table[resistance].resist += 1),
						},
					}
				}
				for (let immunity of immune_to) {
					table = {
						...table,
						[immunity]: {
							...table[immunity],
							immune: (table[immunity].immune += 1),
						},
					}
				}
			})
			setResistanceTable({ ...table })
			setLoadingTable(false)
		}
	}, [typeLoading, pkmnLoading])

	return { resistanceTable, loadingTable }
}
