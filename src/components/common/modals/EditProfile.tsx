import React from 'react'
import { useState } from 'react'

import SelectAvatar from 'components/common/buttons/SelectAvatar'
import SelectColor from 'components/common/buttons/SelectColor'
import FormInput from 'components/common/forms/FormInput'
import Button from 'components/modules/Button'
import Modal from 'components/modules/Modal'

import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { selectCurrentUser } from 'redux/slices/authSlice'

interface IEditProfileProps {
	closeEdit: () => void
}
interface initForm {
	name: string
	location?: string
	bio?: string
	user_img: string
	bg_color: string
}
const avatarOptions = ['m1', 'm4', 'm2', 'm3', 'f1', 'f4', 'f2', 'f3']
const colorOptions = [
	'bg-black',
	'bg-primary',
	'bg-secondary',
	'bg-green',
	'bg-yellow',
	'bg-purple',
]

function clickIcon(
	event: any,
	state: initForm,
	action: React.Dispatch<React.SetStateAction<initForm>>,
) {
	console.log(event)
	action({ ...state, [event.target.name]: event.target.id })
}

function clickColor(
	event: any,
	state: initForm,
	action: React.Dispatch<React.SetStateAction<initForm>>,
) {
	action({
		...state,
		[event.target.name]: event.target.id,
	})
}

function handleChange(
	event: any,
	state: initForm,
	action: React.Dispatch<React.SetStateAction<initForm>>,
) {
	action({
		...state,
		[event.target.id]: event.target.value,
	})
}

function EditProfile({ closeEdit }: IEditProfileProps) {
	const user = useAppSelector(selectCurrentUser)
	const dispatch = useAppDispatch()
	const [formData, setFormData] = useState<initForm>({
		name: user.userInfo.name,
		location: user.userInfo.location,
		bio: user.userInfo.bio,
		user_img: user.userInfo.user_img,
		bg_color: user.userInfo.bg_color,
	})

	function updateProfile(event: any) {
		event.preventDefault()
		closeEdit()
		dispatch({ type: 'users/UPDATE', formData, userId: user.userInfo.id })
	}

	return (
		<Modal closeModal={closeEdit}>
			<Modal.Header>Edit Profile</Modal.Header>
			<Modal.Body>
				<form onSubmit={e => updateProfile(e)} className="flex flex-col gap-y-3">
					<FormInput
						name="name"
						label="Name"
						value={formData.name}
						error={''}
						type="text"
						handleChange={e => handleChange(e, formData, setFormData)}
					/>
					<FormInput
						name="location"
						label="Location"
						value={formData.location || ''}
						error={''}
						type="text"
						handleChange={e => handleChange(e, formData, setFormData)}
					/>
					<FormInput
						name="bio"
						label="Bio"
						type="textArea"
						value={formData.bio || ''}
						error={''}
						handleChange={e => handleChange(e, formData, setFormData)}
					/>
					<hr />
					<h3>Choose profile photo</h3>
					<div className="grid grid-cols-4 gap-x-5 gap-y-5">
						{avatarOptions.map(option => (
							<SelectAvatar
								key={option}
								click={e => clickIcon(e, formData, setFormData)}
								id={option}
								selected={formData.user_img === option}
							/>
						))}
					</div>
					<hr />
					<h3>Choose background color</h3>
					<div className="grid grid-cols-6 gap-x-5">
						{colorOptions.map((option, index) => (
							<SelectColor
								key={option}
								color={option}
								click={e => clickColor(e, formData, setFormData)}
								selected={formData.bg_color === option}
							/>
						))}
					</div>
					<hr />
					<Button.Primary>Update</Button.Primary>
				</form>
				<Button.Secondary classList="mt-2" isDisabled={true}>
					Delete Profile
				</Button.Secondary>
			</Modal.Body>
		</Modal>
	)
}

export default EditProfile
