const month_names = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

export const formatAMPM = (date: Date) => {
  var hours = date.getHours()
  var min = date.getMinutes()
  var ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  let hh = hours < 10 ? '0' + hours : hours
  let minutes = min < 10 ? '0' + min : min
  var strTime = hh + ':' + minutes + ' ' + ampm
  return strTime
}
//mmm dd, hh:ss am
export const formatDateForNotification = (date: Date) => {
  let day = date.getDate()
  let month_index = date.getMonth()
  return '' + month_names[month_index] + ' ' + day + ', ' + formatAMPM(date)
}

export function formatDateForMessages(date: Date): string {
  const day = date.getDate()
  const today = new Date(Date.now()).getDate()
  return today === day + 1 ? 'Yesterday' : formatDateForNotification(date)
}
