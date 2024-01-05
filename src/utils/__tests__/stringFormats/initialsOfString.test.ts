import { initialsOfString } from '@/utils/stringFormats'

const STRING_WITHOUT_WHITE_SPACES = 'Emerzon'
const STRING_WITH_WHITE_SPACES = 'Emerzon Kolki'

describe('initialsOfString()', () => {
  it('Should return the 2 starting characters of string if this not contain blank spaces', () => {
    const initials = initialsOfString(STRING_WITHOUT_WHITE_SPACES)
    expect(initials).toMatch(/^em/i)
  })

  it('Should return the first character of the words in the string if it has spaces', () => {
    const initials = initialsOfString(STRING_WITH_WHITE_SPACES)
    expect(initials).toMatch(/^ek/i)
  })

  it('Should ignore whitespace at the beginning of the string', () => {
    const initialsWithWhiteSpaces = initialsOfString(
      ' ' + STRING_WITH_WHITE_SPACES
    )
    const initialsWithoutWhiteSpaces = initialsOfString(
      ' ' + STRING_WITHOUT_WHITE_SPACES
    )

    expect(initialsWithWhiteSpaces).toMatch(/^ek/i)
    expect(initialsWithoutWhiteSpaces).toMatch(/^em/i)
  })

  it('Should return a string of only 2 characters', () => {
    const initialsWithWhiteSpaces = initialsOfString(
      STRING_WITH_WHITE_SPACES + ' Martinez'
    )
    const initialsWithoutWhiteSpaces = initialsOfString(
      STRING_WITHOUT_WHITE_SPACES
    )

    expect(initialsWithWhiteSpaces).toHaveLength(2)
    expect(initialsWithoutWhiteSpaces).toHaveLength(2)
  })

  it('Should return a lowercase string', () => {
    const initialsWithWhiteSpaces = initialsOfString(STRING_WITH_WHITE_SPACES)
    const initialsWithoutWhiteSpaces = initialsOfString(
      STRING_WITHOUT_WHITE_SPACES
    )

    expect(initialsWithWhiteSpaces).toBe('ek')
    expect(initialsWithoutWhiteSpaces).toBe('em')
  })
})
