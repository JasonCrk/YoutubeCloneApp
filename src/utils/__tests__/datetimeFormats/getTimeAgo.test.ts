import { getTimeAgo, DATE_UNITS } from '@/utils/datetimeFormats'

describe('getTimeAgo()', () => {
  it('Should return "time ago" for seconds', () => {
    const timeAgoForOneSecond = getTimeAgo(
      new Date(Date.now() - DATE_UNITS.second * 1000)
    )
    const timeAgoForSeconds = getTimeAgo(
      new Date(Date.now() - DATE_UNITS.second * 5 * 1000)
    )

    expect(timeAgoForOneSecond).toBe('1 second ago')
    expect(timeAgoForSeconds).toBe('5 seconds ago')
  })

  it('Should return "time ago" for minutes', () => {
    const timeAgoForOneMinute = getTimeAgo(
      new Date(Date.now() - DATE_UNITS.minute * 1000)
    )
    const timeAgoForMinutes = getTimeAgo(
      new Date(Date.now() - DATE_UNITS.minute * 2 * 1000)
    )

    expect(timeAgoForOneMinute).toBe('1 minute ago')
    expect(timeAgoForMinutes).toBe('2 minutes ago')
  })

  it('Should return "time ago" for hours', () => {
    const timeAgoForOneHour = getTimeAgo(
      new Date(Date.now() - DATE_UNITS.hour * 1000)
    )
    const timeAgoForHours = getTimeAgo(
      new Date(Date.now() - DATE_UNITS.hour * 2 * 1000)
    )

    expect(timeAgoForOneHour).toBe('1 hour ago')
    expect(timeAgoForHours).toBe('2 hours ago')
  })

  it('Should return "time ago" for days', () => {
    const timeAgoForOneDay = getTimeAgo(
      new Date(Date.now() - DATE_UNITS.day * 1000)
    )
    const timeAgoForDays = getTimeAgo(
      new Date(Date.now() - DATE_UNITS.day * 2 * 1000)
    )

    expect(timeAgoForOneDay).toBe('1 day ago')
    expect(timeAgoForDays).toBe('2 days ago')
  })

  it('Should return "time ago" for weeks', () => {
    const timeAgoForOneWeek = getTimeAgo(
      new Date(Date.now() - DATE_UNITS.week * 1000)
    )
    const timeAgoForWeeks = getTimeAgo(
      new Date(Date.now() - DATE_UNITS.week * 2 * 1000)
    )

    expect(timeAgoForOneWeek).toBe('1 week ago')
    expect(timeAgoForWeeks).toBe('2 weeks ago')
  })
})
