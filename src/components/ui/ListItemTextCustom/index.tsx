import { FC } from 'react'

import { ListItemText, TypographyProps } from '@mui/material'

interface Props extends TypographyProps<'span'> {
  content: string
  isActive?: boolean
}

const ListItemTextCustom: FC<Props> = ({
  content,
  isActive,
  ...titleProps
}) => {
  return (
    <ListItemText
      primary={content}
      data-testid='ListItemText'
      primaryTypographyProps={{
        fontFamily: 'Youtube, sans-serif',
        fontWeight: isActive ? 'bold' : 'normal',
        fontSize: '0.9rem',
        lineHeight: 1,
        ...titleProps
      }}
    />
  )
}

export default ListItemTextCustom
