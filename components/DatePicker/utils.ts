import dayjs from 'dayjs'

const DP_GAP_SIGN = ' - '

const dpRangeToString = (from: Date, to: Date) => {
  const formatFrom = dayjs(from).format('DD/MM/YYYY')
  const formatTo = dayjs(to).format('DD/MM/YYYY')

  return formatFrom + DP_GAP_SIGN + formatTo
}

const dpRangeToDate = (dpString: string) => {
  const [from, to] = dpString.split(DP_GAP_SIGN)
  if (!from || !to) {
    return [undefined, undefined]
  }

  const fromDate = dayjs(from)
  const toDate = dayjs(to)

  if (!fromDate.isValid() || !toDate.isValid()) {
    console.error('Invalid datepicker value')
    return [undefined, undefined]
  }

  return [fromDate.toDate(), toDate.toDate()]
}

export { dpRangeToString, dpRangeToDate }
