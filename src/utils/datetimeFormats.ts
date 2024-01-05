export const DATE_UNITS = {
  week: 604800,
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1
}

export const getSecondsDiff = (timestamp: number) =>
  (Date.now() - timestamp) / 1000

export const getUnitAndValueDate = (secondsElapsed: number) => {
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (secondsElapsed >= secondsInUnit || unit === 'second') {
      const value = Math.floor(secondsElapsed / secondsInUnit) * -1
      return { value, unit }
    }
  }
}

export const getTimeAgo = (datetime: Date) => {
  const timeAgoFormat = new Intl.RelativeTimeFormat('en')

  const secondsElapsed = getSecondsDiff(datetime.getTime())
  const { value, unit } = getUnitAndValueDate(secondsElapsed)!

  const timeAgoUnit = value < -1 ? unit + 's' : unit

  return timeAgoFormat.format(value, timeAgoUnit as Intl.RelativeTimeFormatUnit)
}
