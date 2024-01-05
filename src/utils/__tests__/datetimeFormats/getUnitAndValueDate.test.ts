import { DATE_UNITS, getUnitAndValueDate } from '@/utils/datetimeFormats'

describe('getUnitAndValueDate()', () => {
  it('Should correctly return the time difference for seconds', () => {
    const diff = getUnitAndValueDate(DATE_UNITS.second)
    expect(diff).toEqual({ value: -1, unit: 'second' })
  })

  it('Should correctly return the time difference for minutes', () => {
    const diff = getUnitAndValueDate(DATE_UNITS.minute)
    expect(diff).toEqual({ value: -1, unit: 'minute' })
  })

  it('Should correctly return the time difference for hours', () => {
    const diff = getUnitAndValueDate(DATE_UNITS.hour)
    expect(diff).toEqual({ value: -1, unit: 'hour' })
  })

  it('Should correctly return the time difference for days', () => {
    const diff = getUnitAndValueDate(DATE_UNITS.day)
    expect(diff).toEqual({ value: -1, unit: 'day' })
  })

  it('Should correctly return the time difference for week', () => {
    const diff = getUnitAndValueDate(DATE_UNITS.week)
    expect(diff).toEqual({ value: -1, unit: 'week' })
  })
})
