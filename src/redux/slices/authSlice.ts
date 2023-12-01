import { PayloadAction, createSlice, current } from '@reduxjs/toolkit'
import { RootState } from 'redux/store'
import { IAuthUser, IUser } from 'utils/Interfaces'

const initialState: IAuthUser | null = {
	loading: false,
	userInfo: {
		id: 10,
		bio: 'I am an anonymous user. Change whatever you like, or make a new account!',
		location: '',
		pronouns: '',
		name: 'John Doe',
		username: 'anon10',
		password: 'password',
		user_img: 'dfault',
		bg_color: 'bg-black',
		favorite: 0,
	},
	userToken:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3Mjc2NjAyOCwiZXhwIjoxNjc0NDk0MDI4fQ.kCak9sLJr74frSRVQp0_27BY4iBCgQSmoT3vQVWKzJg',
	error: null,
	success: false,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		auth_LOGIN(state, action: PayloadAction<IUser>) {
			const user_to_login = action.payload
			state.userInfo = user_to_login
		},
		auth_LOGOUT(state) {
			state.userInfo = null
		},
	},
})
export const { auth_LOGIN, auth_LOGOUT } = authSlice.actions
export default authSlice.reducer

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth
