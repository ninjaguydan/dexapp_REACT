import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import FormInput from 'components/common/forms/FormInput'

import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import pk_ball from 'media/pokeball.png'
import { auth_LOGIN, selectCurrentUser } from 'redux/slices/authSlice'
import { user_ADDED } from 'redux/slices/userSlice'
import { IRegistrationObject } from 'utils/Interfaces'
import { checkIfEmpty, checkIfValues, confirmPasswordMatch, validator } from 'utils/Validator'
import { v4 as uuidv4 } from 'uuid'

const emptyForm = {
	name: '',
	username: '',
	password: '',
	confirm: '',
}

const Register = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const currentUser = useAppSelector(selectCurrentUser)
	const [values, setValues] = useState<IRegistrationObject>(emptyForm)
	const [errors, setErrors] = useState(values)
	const handleChange = (event: any) => {
		setValues({ ...values, [event.target.id]: event.target.value })
	}

	useEffect(() => {
		if (currentUser.userInfo) {
			navigate('/dexapp_REACT')
		}
	}, [])

	useEffect(() => {
		setErrors({
			...errors,
			...validator(values),
			confirm: confirmPasswordMatch(values.confirm as string, values.password),
		})
	}, [values])

	function onSubmit(event: any) {
		event.preventDefault()
		let newUser = {
			...values,
			id: uuidv4(),
			user_img: 'dfault',
			bg_color: 'bg-black',
		}
		dispatch(user_ADDED(newUser))
		dispatch(auth_LOGIN(newUser))
		navigate('/dexapp_REACT')
	}

	return (
		<div className="w-full lg:flex lg:gap-x-16">
			<div className="mx-auto mt-8 flex w-full max-w-lg flex-col gap-y-3 rounded-lg bg-gray2 p-6 lg:h-[fit-content]">
				<h1 className="text-3xl font-medium">Register</h1>
				<hr />
				<form onSubmit={e => onSubmit(e)} className="flex flex-col gap-y-3">
					<FormInput
						label="Name"
						name="name"
						type="text"
						value={values.name}
						handleChange={handleChange}
						error={errors.name}
					/>
					<FormInput
						label="Username"
						name="username"
						type="text"
						value={values.username}
						handleChange={handleChange}
						error={errors.username}
					/>
					<FormInput
						label="Password"
						name="password"
						type="password"
						value={values.password}
						handleChange={handleChange}
						error={errors.password}
					/>
					<FormInput
						label="Confirm Password"
						name="confirm"
						type="password"
						value={values.confirm as string}
						handleChange={handleChange}
						error={errors.confirm as string}
					/>
					<div className="flex flex-col gap-x-3 gap-y-3 sm:flex-row">
						<button
							className="w-full rounded bg-primary px-8 py-1 text-white hover:bg-primaryDark disabled:opacity-50"
							disabled={checkIfEmpty(errors) && checkIfValues(values) ? false : true}
						>
							Sign Up
						</button>
						<Link
							to="/login"
							className="w-full rounded border border-solid px-4 py-1 text-center hover:bg-gray3"
						>
							Log In
						</Link>
					</div>
				</form>
			</div>
			<div className="mx-auto mt-8 w-full max-w-xl text-center">
				<h2 className="mb-8 text-3xl font-medium">
					Join a vast community of{' '}
					<span className="font-bold text-secondary">Pokemon Trainers</span> from all over
					the world!
				</h2>
				<img src={pk_ball} alt="7 Pokeballs bunched together" />
			</div>
		</div>
	)
}

export default Register
