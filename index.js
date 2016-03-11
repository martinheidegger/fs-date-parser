module.exports = function getDateFromPath (path) {
  var dateParts = /^([0-9]{4})([^a-z0-9]?([0-9]{1,2}))?([^a-z0-9]?([0-9]{1,2}))?([^a-z0-9]?([0-9]{1,2})[^a-z0-9]?([0-9]{2})([^a-z0-9]?([0-9]{2}))?(am|pm)?)?([^a-z0-9-+]+((\+|\-)([0-9]{2})([0-9]{2})))?[\-_.]?/i.exec(path)
  var year
  var month
  var day
  var hour
  var minute
  var second
  var plusMinus
  var hourOffset
  var minuteOffset
  var date = null
  var rest = path
  if (dateParts) {
    rest = path.substr(dateParts[0].length)
    hour = 0
    minute = 0
    second = 0
    if (dateParts[6]) {
      // Time part
      hour = parseInt(dateParts[7], 10)
      minute = parseInt(dateParts[8], 10)
      second = dateParts[10] !== undefined ? parseInt(dateParts[10], 10) : 0
      if (dateParts[11] === 'pm') {
        hour += 12
      }
    }
    year = parseInt(dateParts[1], 10)
    month = dateParts[3] !== undefined ? parseInt(dateParts[3], 10) - 1 : 0
    day = dateParts[5] !== undefined ? parseInt(dateParts[5], 10) : 1

    if (!dateParts[14]) {
      date = new Date(year, month, day, hour, minute, second)
    } else {
      // Timezone part
      plusMinus = (dateParts[14] === '+') ? 1 : -1
      hourOffset = parseInt(dateParts[15], 10) * plusMinus
      minuteOffset = parseInt(dateParts[16], 10) * plusMinus
      date = new Date(Date.UTC(
        year, month, day, hour + hourOffset, minute + minuteOffset, second
      ))
    }
  }
  return {
    date: date,
    rest: rest
  }
}
