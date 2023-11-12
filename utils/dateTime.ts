import moment from 'moment'

export const FORMAT_DATE_TIME = {
  dmy: 'D/M/YYYY',
  ymd: 'YYYY/MM/DD'
}

export const toDate = (time: moment.MomentInput, format: string = FORMAT_DATE_TIME.dmy) =>
  time ? moment(time).format(format) : undefined

export function reformatDateString(date: string | Date) {
  if (typeof date === 'string') {
    var b = date.split(/\D/)
    return b.reverse().join('-')
  }
  return date
}
