import { titleCase } from 'utils/Helpers'
import { checkNum } from 'utils/Helpers'

import { IRegistrationObject } from './Interfaces'

function validateName(value: string) {
	if (value && value.trim().length < 2) {
		return 'Name must be at least 2 characters'
	} else if (value.trim().length > 30) {
		return "Name can't be more than 30 characters"
	} else {
		return ''
	}
}
function validateUsername(value: string) {
	if (value && value.trim().length < 5) {
		return 'Username must be at least 5 characters'
	} else if (value.trim().length > 15) {
		return "Name can't be more than 15 characters"
	} else {
		return ''
	}
}
function validatePassword(value: string) {
	if (value && value.length < 8) {
		return 'Password must be at least 8 characters'
	} else if (value.length > 16) {
		return "Password can't be more than 16 characters"
	} else {
		return ''
	}
}
export function confirmPasswordMatch(value1: string, value2: string) {
	if (value1 && value1 !== value2) {
		return 'Passwords do not match'
	} else {
		return ''
	}
}

export function validator(object: IRegistrationObject) {
	let errors = {
		name: validateName(object.name),
		username: validateUsername(object.username),
		password: validatePassword(object.password),
	}
	return errors
}
//Returns true if every value in the object is empty
export function checkIfEmpty(object: IRegistrationObject) {
	let values = Object.values(object)
	return values.every(x => x === null || x === '')
}
//Return true if every value in the object is not empty
export function checkIfValues(object: IRegistrationObject) {
	let values = Object.values(object)
	return values.every(x => x !== null && x !== '')
}

type TeamEditErrors =
	| 'Team name cannot contain numbers'
	| 'Team name must have at least 2 characters.'
	| "Team name can't be more than 20 characters."
	| "Uh oh... looks like there's already a team with this name."

export function setTeamNameError(value: string, existingNames: string[]): TeamEditErrors | '' {
	if (checkNum(value)) return 'Team name cannot contain numbers'
	if (value.length < 2) return 'Team name must have at least 2 characters.'
	if (value.length > 20) return "Team name can't be more than 20 characters."
	if (existingNames.includes(titleCase(value)))
		return "Uh oh... looks like there's already a team with this name."
	return ''
}
