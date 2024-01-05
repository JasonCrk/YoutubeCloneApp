import { getSecondsDiff } from '@/utils/datetimeFormats'

describe('getSecondsDiff()', () => {
  it('Should return the time distance correctly', () => {
    const secondsDiff1 = getSecondsDiff(Date.now() - 5000)
    const secondsDiff2 = getSecondsDiff(Date.now() - 10000)

    expect(secondsDiff1).toBe(5)
    expect(secondsDiff2).toBe(10)
  })
})
