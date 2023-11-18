import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import IconBtn from 'components/common/buttons/IconBtn'
import EditTeam from 'components/common/modals/EditTeam'
import Button from 'components/modules/Button'

import useLikes from 'hooks/dispatch/useLikes'
import useSetStats from 'hooks/fetchers/useSetStats'
import { useAppDispatch } from 'hooks/hooks'
import { team_LIKE, team_UNLIKE } from 'redux/slices/teamSlice'
import { ITeam } from 'utils/Interfaces'
import { ICON_KEY } from 'utils/iconKey'

interface ITeamStatsProps {
	current_user_id: string | number
	team: ITeam
	created_by: string
}

export default function TeamStats({ current_user_id, team, created_by }: ITeamStatsProps) {
	const dispatch = useAppDispatch()
	// local state
	const [showStats, setShowStats] = useState(true)
	const [showEditTeam, setShowEditTeam] = useState(false)
	// hooks
	const { statTable: stats } = useSetStats(team.members)
	// button ref for focus trap
	const buttonRef: React.MutableRefObject<HTMLButtonElement | undefined> = useRef()
	const focus = () => buttonRef.current?.focus()

	const toggleLike = () => {
		const payload = { teamId: team.id, userId: current_user_id }
		if (team.likes.includes(current_user_id)) {
			dispatch(team_UNLIKE(payload))
		} else {
			dispatch(team_LIKE(payload))
		}
	}

	const likeBtnData = {
		label: ICON_KEY.LIKES,
		content: team.likes.length,
		action: () => toggleLike(),
		state: !!current_user_id && !!team.likes.find(like => like === current_user_id),
		classList: '!text-lg',
	}

	return (
		<ul className="relative h-[fit-content] w-full rounded border border-solid border-white border-opacity-10 bg-gray2 [&_li:nth-child(even)]:bg-gray6">
			<li className="flex flex-col items-center gap-y-2 border-b border-solid border-white border-opacity-10 p-3 text-center sm:gap-y-4 sm:p-6">
				<div>
					<h2 className="text-2xl capitalize">{team.name}</h2>
					<p className="text-gray4">
						by <Link to={`/profile/${created_by}`}>{created_by}</Link>
					</p>
				</div>
				<div className="flex gap-x-8">
					<IconBtn btnData={likeBtnData} />
				</div>
			</li>
			{current_user_id === team.added_by && (
				<li className="flex justify-between border-b border-solid border-white border-opacity-10 px-8 py-2 text-xs sm:px-6 sm:text-sm">
					<Button.Secondary
						ref={buttonRef}
						action={() => {
							setShowEditTeam(true)
						}}
					>
						Edit Team
					</Button.Secondary>
				</li>
			)}
			{showStats && (
				<>
					{Object.keys(stats).map((stat, i) => (
						<li
							key={i}
							className="flex justify-between border-b border-solid border-white border-opacity-10 px-8 py-2 text-xs sm:px-6 sm:text-sm"
						>
							<p className="font-bold">{stat}</p>
							<span>{stats[stat]}</span>
						</li>
					))}
				</>
			)}

			<li
				className="border-b border-solid border-white border-opacity-10 p-3 px-8 text-center sm:p-6 sm:px-6"
				id="toggle-stats"
			>
				<button
					className="w-full rounded border border-solid px-8 py-1 text-xs hover:bg-gray3"
					onClick={() => {
						setShowStats(!showStats)
					}}
				>
					Hide/Display Team Stats
				</button>
			</li>
			{!!showEditTeam && (
				<EditTeam
					onClose={() => {
						setShowEditTeam(false)
						focus()
					}}
					team={team}
				/>
			)}
		</ul>
	)
}
