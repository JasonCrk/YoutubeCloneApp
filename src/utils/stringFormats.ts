export const initialsOfString = (text: string): string => {
  const textTrim = text.trim().toLowerCase()

  if (textTrim.includes(' '))
    return text
      .trim()
      .split(' ')
      .reduce((prev, current) => prev + current[0], '')
      .substring(0, 2)
      .toLowerCase()

  return textTrim.substring(0, 2)
}
