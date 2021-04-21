import { formatAMPM, formatDateForNotification } from '../DateUtils'

test('test am pm format', () => {
  let d = new Date()
  d.setTime(1332403882588)
  expect(formatAMPM(d)).toMatch(
    /(00|01|02|03|04|06|07|08|09|10|11|12):([0-5]?[0-9]) (am|pm)/
  )
})

test('test date format for notification', () => {
  let d = new Date()
  d.setTime(1332403882588)
  expect(formatDateForNotification(d)).toMatch(
    /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) [0-3][0-9], (00|01|02|03|04|06|07|08|09|10|11|12):([0-5]?[0-9]) (am|pm)/
  )
})
