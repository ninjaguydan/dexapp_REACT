import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'redux/store'
import { ITeam } from 'utils/Interfaces'

const initialState: ITeam[] = [
	{
		id: 1,
		name: 'Genwunners',
		members: [25, 3, 6, 9, 143, 131],
		likes: [1, 10],
		added_by: 1,
		created: 1654279977000,
	},
	{
		id: 2,
		name: 'Blue Balls',
		members: [18, 65, 112, 103, 130, 6],
		likes: [],
		added_by: 2,
		created: 1635000000000,
	},
	{
		id: 3,
		name: 'Try Hards',
		members: [442, 407, 423, 445, 448, 350],
		likes: [],
		added_by: 2,
		created: 1533219944000,
	},
	{
		id: 4,
		name: 'Cutie Patooties',
		members: [184, 547, 423, 443, 447, 350],
		likes: [],
		added_by: 3,
		created: 1655171111085,
	},
	{
		id: 5,
		name: 'Test',
		members: [1005, 995],
		likes: [],
		added_by: 10,
		created: 1699557368376,
	},
	{
		created: 1685171111085,
		added_by: 10,
		id: '698a02d8-658b-47ce-b8bc-3f009d817ab8',
		likes: [],
		members: [129, 129, 129, 129, 129, 129],
		name: 'Fisherman Wade',
	},
]

const teamSlice = createSlice({
	name: 'teams',
	initialState,
	reducers: {
		team_CREATE(state, action: PayloadAction<ITeam>) {
			const newTeam = action.payload
			state.push(newTeam)
		},
		team_DELETE(state, action: PayloadAction<string | number>) {
			const teamId = action.payload
			return state.filter(team => team.id !== teamId)
		},
		team_UPDATE(
			state,
			action: PayloadAction<{ id: number | string; members: number[]; teamName: string }>,
		) {
			const { id, members, teamName } = action.payload
			const team = state.find(team => team.id === id)
			if (team) {
				team.name = teamName
				team.members = members
			}
		},
		team_LIKE(
			state,
			action: PayloadAction<{ teamId: number | string; userId: number | string }>,
		) {
			const { teamId, userId } = action.payload
			const likedTeam = state.find(team => team.id === teamId)
			if (likedTeam) {
				likedTeam.likes.push(userId)
			}
		},
		team_UNLIKE(
			state,
			action: PayloadAction<{ teamId: number | string; userId: number | string }>,
		) {
			const { teamId, userId } = action.payload
			const unlikedTeam = state.find(team => team.id === teamId)
			if (unlikedTeam) {
				unlikedTeam.likes = unlikedTeam.likes.filter(like => like !== userId)
			}
		},
	},
})

export const { team_CREATE, team_DELETE, team_UPDATE, team_LIKE, team_UNLIKE } = teamSlice.actions
export default teamSlice.reducer

// selectors
export const selectTeams = (state: RootState) => state.teams
export const selectTeamByName = createSelector(
	[selectTeams, (state: RootState, teamName: string | undefined) => teamName],
	(teams, teamName) => teams.filter(team => team.name === teamName)[0],
)
export const selectAllTeamNames = createSelector([selectTeams], teams => {
	return teams.map(team => team.name)
})
export const selectTeamsByCreator = createSelector(
	[selectTeams, (state: RootState, userId: number | string) => userId],
	(teams, userId) => {
		return teams.filter(team => team.added_by === userId)
	},
)
export const selectOpenTeamsByCreator = createSelector(
	[selectTeams, (state: RootState, userId: number | string) => userId],
	(teams, userId) => {
		return teams.filter(team => team.added_by === userId && team.members.length < 6)
	},
)
export const selectTeamCountByPkmn = createSelector(
	[selectTeams, (state: RootState, pkmnId: number | undefined) => pkmnId],
	(teams, pkmnId) => {
		if (!pkmnId) return 0
		return teams.filter(team => team.members.includes(pkmnId)).length
	},
)
export const selectTeamsByPkmn = createSelector(
	[selectTeams, (state: RootState, pkmnId: number | undefined) => pkmnId],
	(teams, pkmnId) => {
		if (!pkmnId) return []
		return teams.filter(team => team.members.includes(pkmnId))
	},
)
