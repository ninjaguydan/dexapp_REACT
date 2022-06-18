function validateName(value) {
	if (value && value.trim().length < 2) {
		return "Name must be at least 2 characters"
	} else if (value.trim().length > 30) {
		return "Name can't be more than 30 characters"
	} else {
		return ""
	}
}
function validateUsername(value) {
	if (value && value.trim().length < 5) {
		return "Username must be at least 5 characters"
	} else if (value.trim().length > 15) {
		return "Name can't be more than 15 characters"
	} else {
		return ""
	}
}
function validatePassword(value) {
	if (value && value.length < 8) {
		return "Password must be at least 8 characters"
	} else if (value.length > 16) {
		return "Password can't be more than 16 characters"
	} else {
		return ""
	}
}
export function confirmPasswordMatch(value1, value2) {
	if (value1 && value1 !== value2) {
		return "Passwords do not match"
	} else {
		return ""
	}
}

export function validator(object) {
	let errors = {
		name: validateName(object.name),
		username: validateUsername(object.username),
		password: validatePassword(object.password),
	}
	return errors
}
//Returns true if every value in the object is empty
export function checkIfEmpty(object) {
	let values = Object.values(object)
	return values.every((x) => x === null || x === "")
}
//Return true if every value in the object is not empty
export function checkIfValues(object) {
	let values = Object.values(object)
	return values.every((x) => x !== null && x !== "")
}
