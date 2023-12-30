export const initialsOfString = (content: string) => {
  return content.split(' ').reduce((prev, current) => prev + current[0], '')
}
