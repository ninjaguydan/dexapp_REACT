export function makeHundreds(num: number | undefined) {
	if (!num) return '000'
	if (num < 10) {
		return `00${num}`
	} else if (num < 100) {
		return `0${num}`
	} else {
		return num
	}
}
export function getBaseStatTotal(arr: number[]) {
	return arr.reduce((a, b) => {
		return a + b
	}, 0)
}
export function renderStars(num: number) {
	var result = ''
	for (var i = 1; i < 11; i++) {
		if (i <= num) {
			result = result + '<FaStar />'
		} else {
			result = result + '<FaRegStar />'
		}
	}
	return result
}
export function checkNum(value: string) {
	return value.match(/\d/)
}
export function truncateStr(string: string) {
	if (string.length > 13) {
		let str = string.substring(0, 12)
		return `${str}...`
	}
	return string
}
export function titleCase(str: string | undefined) {
	if (str === undefined || str === '') return ''
	return str
		.toLowerCase()
		.split(' ')
		.map(function (word) {
			return word.replace(word[0], word[0].toUpperCase())
		})
		.join(' ')
}
export function getRandomInt(min: number, max: number) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min) + min)
}
export function getRandomFloat(min: number, max: number) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return (Math.random() * (max - min) + min).toFixed(1)
}
export function addOrdinalSuffix(indexStr: string) {
	let index = parseInt(indexStr)
	let j = index % 10,
		k = index % 100
	if (j === 1 && k !== 11) {
		return index + 'st'
	}
	if (j === 2 && k !== 12) {
		return index + 'nd'
	}
	if (j === 3 && k !== 13) {
		return index + 'rd'
	}
	return index + 'th'
}
export function pluralize(count: number, noun: string, suffix: string = 's') {
	return count !== 1 ? `${noun}${suffix}` : noun
}

function getSeconds(milliseconds: number) {
	return milliseconds / 1000
}
function getMinutes(milliseconds: number) {
	return milliseconds / 60000
}
function getHours(milliseconds: number) {
	return milliseconds / 3600000
}
function getDays(milliseconds: number) {
	return milliseconds / 86400000
}
function getWeeks(milliseconds: number) {
	return milliseconds / 604800000
}
function getMonths(milliseconds: number) {
	return milliseconds / 2629746000
}
function getYears(milliseconds: number) {
	return milliseconds / 31556952000
}

export function getTimeDifference(date: number) {
	let now = new Date().getTime()
	let time = new Date(date).getTime()
	let milli = now - time
	let roundDown = Math.floor
	let years = getYears(milli)
	let months = getMonths(milli)
	let weeks = getWeeks(milli)
	let days = getDays(milli)
	let hours = getHours(milli)
	let min = getMinutes(milli)
	let sec = getSeconds(milli)

	if (roundDown(years) > 0) {
		return `${roundDown(years)}y`
	} else if (roundDown(months) > 0) {
		return `${roundDown(months)}mo`
	} else if (roundDown(weeks) > 0) {
		return `${roundDown(weeks)}w`
	} else if (roundDown(days) > 0) {
		return `${roundDown(days)}d`
	} else if (roundDown(hours) > 0) {
		return `${roundDown(hours)}h`
	} else if (roundDown(min) > 0) {
		return `${roundDown(min)}m`
	} else {
		return `${roundDown(sec)}s`
	}
}
