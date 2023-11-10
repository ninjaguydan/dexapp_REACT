export function makeHundreds(num) {
  if (num < 10) {
    return `00${num}`;
  } else if (num < 100) {
    return `0${num}`;
  } else {
    return num;
  }
}
export function getBaseStatTotal(arr) {
  return arr.reduce((a, b) => {
    return a + b;
  }, 0);
}
export function renderStars(num) {
  var result = "";
  for (var i = 1; i < 11; i++) {
    if (i <= num) {
      result = result + "<FaStar />";
    } else {
      result = result + "<FaRegStar />";
    }
  }
  return result;
}
export function checkNum(value) {
  return value.match(/\d/);
}
export function truncateStr(string) {
  if (string.length > 13) {
    let str = string.substring(0, 12);
    return `${str}...`;
  }
  return string;
}
export function titleCase(str) {
  if (str === undefined) return;
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
}
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
export function getRandomFloat(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return (Math.random() * (max - min) + min).toFixed(1);
}
export function addOrdinalSuffix(i) {
  let j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return i + "st";
  }
  if (j === 2 && k !== 12) {
    return i + "nd";
  }
  if (j === 3 && k !== 13) {
    return i + "rd";
  }
  return i + "th";
}

function getSeconds(milliseconds) {
  return milliseconds / 1000;
}
function getMinutes(milliseconds) {
  return milliseconds / 60000;
}
function getHours(milliseconds) {
  return milliseconds / 3600000;
}
function getDays(milliseconds) {
  return milliseconds / 86400000;
}
function getWeeks(milliseconds) {
  return milliseconds / 604800000;
}
function getMonths(milliseconds) {
  return milliseconds / 2629746000;
}
function getYears(milliseconds) {
  return milliseconds / 31556952000;
}

export function getTimeDifference(date) {
  let now = new Date();
  let time = new Date(date);
  let milli = now - time;
  let roundDown = Math.floor;
  let years = getYears(milli);
  let months = getMonths(milli);
  let weeks = getWeeks(milli);
  let days = getDays(milli);
  let hours = getHours(milli);
  let min = getMinutes(milli);
  let sec = getSeconds(milli);

  if (roundDown(years) > 0) {
    return `${roundDown(years)}y`;
  } else if (roundDown(months) > 0) {
    return `${roundDown(months)}mo`;
  } else if (roundDown(weeks) > 0) {
    return `${roundDown(weeks)}w`;
  } else if (roundDown(days) > 0) {
    return `${roundDown(days)}d`;
  } else if (roundDown(hours) > 0) {
    return `${roundDown(hours)}h`;
  } else if (roundDown(min) > 0) {
    return `${roundDown(min)}m`;
  } else {
    return `${roundDown(sec)}s`;
  }
}
