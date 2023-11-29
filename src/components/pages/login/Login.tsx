import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import Button from 'components/modules/Button'
import FormRow from 'components/modules/FormRow'

import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import pkmn_img from 'media/pkmn.png'
import { auth_LOGIN, selectCurrentUser } from 'redux/slices/authSlice'
import { RootState } from 'redux/store'

const Login = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const currentUser = useAppSelector(selectCurrentUser)
	const users = useSelector((state: RootState) => state.users)
	const [error, setError] = useState(false)
	const username: React.MutableRefObject<HTMLInputElement | undefined> = useRef()
	const password: React.MutableRefObject<HTMLInputElement | undefined> = useRef()

	useEffect(() => {
		if (currentUser.userInfo) {
			navigate('/')
		}
	}, [])

	function onSubmit(event: any) {
		event.preventDefault()
		let logUser = users.find(
			user =>
				user.username === username.current?.value &&
				user.password === password.current?.value,
		)
		if (logUser) {
			dispatch(auth_LOGIN(logUser))
			navigate('/')
		} else {
			setError(true)
		}
	}

	return (
		<div className="w-full">
			<div className="mx-auto mt-8 flex w-full max-w-lg flex-col gap-y-3 rounded-lg bg-gray2 p-6">
				<h1 className="text-3xl font-medium">Login</h1>
				<hr />
				{error && (
					<p className="text-red-500">Email or password does not match our records</p>
				)}
				<form onSubmit={e => onSubmit(e)} className="flex flex-col gap-y-3">
					<FormRow>
						<FormRow.Text ref={username}>Username</FormRow.Text>
					</FormRow>
					<FormRow>
						<FormRow.Password ref={password}>Password</FormRow.Password>
					</FormRow>
					<div className="flex flex-col items-center gap-x-3 gap-y-3 sm:flex-row">
						<Button.Primary>Log In</Button.Primary>
						<Link to={`/register`} className="block w-full">
							<Button.Secondary>Create New Account</Button.Secondary>
						</Link>
					</div>
				</form>
			</div>
			<div className="mx-auto mt-8 w-full max-w-3xl text-center">
				<h2 className="text-3xl font-bold">Welcome Back!</h2>
				<img src={pkmn_img as unknown as string} alt="pokemon trainer with 6 pokemon" />
			</div>
		</div>
	)
}

export default Login
