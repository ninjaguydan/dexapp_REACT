import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { IUser } from 'utils/Interfaces'

const initialState: IUser[] = [
	{
		id: 1,
		bio: 'The very best.',
		pronouns: 'He/Him',
		name: 'Daniel Thompson',
		username: 'danboy',
		password: 'password',
		user_img: 'm1',
		bg_color: 'bg-primary',
		location: 'Jackson, MS',
	},
	{
		id: 2,
		bio: 'This is a bio. I can put anything here. Gotta be respectful tho',
		name: 'Josh Virgil',
		username: 'joshwick420',
		password: '1234',
		user_img: 'm2',
		bg_color: 'bg-green',
	},
	{
		id: 3,
		name: 'Kelsey J',
		username: 'k_sheesh',
		password: 'gggg',
		user_img: 'f3',
		bg_color: 'bg-yellow',
	},
	{
		id: 10,
		bio: 'I am an anonymous user. Change whatever you like, or make a new account!',
		location: '',
		pronouns: '',
		name: 'John Doe',
		username: 'anon10',
		password: 'password',
		user_img: 'dfault',
		bg_color: 'bg-black',
	},
]

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		user_ADDED(state, action: PayloadAction<IUser>) {
			const newUser = action.payload
			state.push(newUser)
		},
		user_UPDATE(state, action: PayloadAction<IUser>) {
			const updatedUser = action.payload
			state = state.map(user => {
				if (user.id === updatedUser.id) return updatedUser
				return user
			})
		},
	},
})

export default userSlice.reducer

// Selectors
export const selectUsers = (state: IUser[]) => state
export const selectUserById = createSelector(
	[selectUsers, (state, userId) => userId],
	(users, userId) => users.filter(user => user.id === userId)[0],
)
