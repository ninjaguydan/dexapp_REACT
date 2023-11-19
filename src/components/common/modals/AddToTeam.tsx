import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from 'components/modules/Button'
import Modal from 'components/modules/Modal'

import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import {
	selectAllTeamNames,
	selectOpenTeamsByCreator,
	team_CREATE,
	team_UPDATE,
} from 'redux/slices/teamSlice'
import { titleCase } from 'utils/Helpers'
import { ITeam } from 'utils/Interfaces'
import { setTeamNameError } from 'utils/Validator'
import { v4 as uuidv4 } from 'uuid'

type Props = {
	onClose: () => void
	userId: number | string
	pkmnId: number
}

export default function AddToTeam({ onClose, userId, pkmnId }: Props) {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [showCreateForm, setShowCreateForm] = useState(false)
	const [error, setError] = useState<string>('')
	const myTeams = useAppSelector(state => selectOpenTeamsByCreator(state, userId))
	const allTeamNames = useAppSelector(selectAllTeamNames)
	// Refs
	const selectedTeam: React.MutableRefObject<HTMLInputElement | undefined> = useRef()
	const teamName: React.MutableRefObject<HTMLInputElement | undefined> = useRef()

	const formHandler = useCallback(
		() => (event: any) => {
			event.preventDefault()

			const data: { teamName: string | undefined; newTeamName: string | undefined } = {
				teamName: selectedTeam.current?.value!,
				newTeamName: titleCase(teamName.current?.value),
			}

			if (!!data.teamName) {
				let existingTeam = myTeams.find(team => team.name == data.teamName)!
				let newMembers = [...existingTeam.members, pkmnId]
				onClose()
				dispatch(
					team_UPDATE({
						id: existingTeam.id,
						teamName: existingTeam.name,
						members: newMembers,
					}),
				)
				navigate(`/team/${data.teamName}`)
			} else {
				setError(setTeamNameError(data.newTeamName!, allTeamNames))
				if (setTeamNameError(data.newTeamName!, allTeamNames) === '') {
					const newTeam: ITeam = {
						id: uuidv4(),
						name: data.newTeamName!,
						members: [pkmnId],
						likes: [],
						added_by: userId,
						created: new Date().getTime(),
					}
					dispatch(team_CREATE(newTeam))
					onClose()
					navigate(`/team/${data.newTeamName!}`)
				}
			}
		},
		[],
	)
	return (
		<Modal closeModal={onClose}>
			<Modal.Header>Add to Team</Modal.Header>
			<Modal.Body>
				{!showCreateForm ? (
					<form className="flex w-full flex-col gap-y-4" onSubmit={formHandler()}>
						<div className="relative flex w-full flex-col gap-y-2">
							<label htmlFor="select-team">Select Team</label>
							<select
								ref={selectedTeam as any}
								className="w-full rounded p-1 text-black"
								name="select-team"
								id="select-team"
							>
								{myTeams.map(team => {
									return <option key={team.id}>{team.name}</option>
								})}
							</select>
						</div>
						{myTeams.length === 0 && (
							<p>No teams with available slots. Try creating a new one!</p>
						)}
						<Button.Primary isDisabled={myTeams.length === 0}>
							Add to Team
						</Button.Primary>
						<span className="flex items-center gap-x-2">
							<hr className="w-full" />
							OR <hr className="w-full" />
						</span>
						<Button.Secondary
							action={() => {
								setShowCreateForm(true)
							}}
						>
							Create New Team
						</Button.Secondary>
					</form>
				) : (
					<form className="flex w-full flex-col gap-y-4" onSubmit={formHandler()}>
						<div className="relative flex w-full flex-col gap-y-2">
							<label htmlFor="team-name">New Team Name</label>
							<input
								ref={teamName as any}
								placeholder="Team Name"
								id="team-name"
								className="w-full rounded p-1 text-black"
								type="text"
							/>
							{error && <p className="text-xs text-red-500">{error}</p>}
						</div>
						<Button.Primary>Create Team and Add</Button.Primary>
						<Button.Secondary
							action={() => {
								setShowCreateForm(false)
								setError('')
							}}
						>
							Back
						</Button.Secondary>
					</form>
				)}
			</Modal.Body>
		</Modal>
	)
}
