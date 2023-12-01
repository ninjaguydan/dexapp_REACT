import TeamCard from 'components/common/posts/TeamCard'
import Card from 'components/modules/Card'

import { ITeam } from 'utils/Interfaces'

type Props = {
	teams: ITeam[]
}

function TeamList({ teams }: Props) {
	return (
		<>
			{teams.length !== 0 ? (
				<>
					{teams.map(team => {
						return <TeamCard key={team.id} team={team} />
					})}
				</>
			) : (
				<Card>No teams yet!!</Card>
			)}
		</>
	)
}

export default TeamList
