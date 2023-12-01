import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import ReplyList from 'components/common/posts/ReplyList'
import TeamGrid from 'components/common/posts/TeamGrid'
import PageNotFound from 'components/pages/error404/PageNotFound'
import TeamResistance from 'components/pages/teams/TeamResistance'
import TeamStats from 'components/pages/teams/TeamStats'

import { useAppSelector } from 'hooks/hooks'
import { selectCurrentUser } from 'redux/slices/authSlice'
import { makeSelectRepliesByTeam } from 'redux/slices/replySlice'
import { selectTeamByName } from 'redux/slices/teamSlice'
import { selectUserById } from 'redux/slices/userSlice'

function TeamProfile() {
	const { teamName } = useParams()
	const team = useAppSelector(state => selectTeamByName(state, teamName))
	const currentUser = useAppSelector(selectCurrentUser)
	const selectTeamReplies = useMemo(makeSelectRepliesByTeam, [])
	const replies = useAppSelector(state => selectTeamReplies(state, team?.id))
	const created_by = useAppSelector(state => selectUserById(state, team.added_by)).username

	if (!team) return <PageNotFound />

	return (
		<div className="flex w-full flex-col gap-4 md:flex-row">
			<aside className="flex flex-col gap-4 sm:flex-row md:w-6/12 md:flex-col">
				<TeamStats
					current_user_id={currentUser.userInfo?.id}
					team={team}
					created_by={created_by}
				/>
				<TeamResistance team={team.members} />
			</aside>

			<div className="flex w-full flex-col gap-4">
				<TeamGrid team={team.members} />

				<ReplyList
					replies={replies}
					user={created_by}
					kind={{ name: 'team', id: team.id }}
				/>
			</div>
		</div>
	)
}
export default TeamProfile
