import type { FC, ReactElement } from 'react'

import ListItemWrapper from '@/components/ui/ListItemWrapper'
import ListItemTextCustom from '@/components/ui/ListItemTextCustom'

import {
  ListItemButtonProps,
  ListItemIcon,
  TypographyProps
} from '@mui/material'

interface Props extends ListItemButtonProps {
  testId?: string
  title: string
  icon: ReactElement
  titleProps?: TypographyProps<
    'span',
    {
      component?: 'span' | undefined
    }
  >
}

const NavbarAsideButton: FC<Props> = ({
  testId,
  title,
  icon,
  titleProps,
  ...buttonProps
}) => {
  return (
    <ListItemWrapper testId={testId} {...buttonProps}>
      <ListItemIcon sx={{ minWidth: '45px' }}>{icon}</ListItemIcon>
      <ListItemTextCustom content={title} {...titleProps} />
    </ListItemWrapper>
  )
}

export default NavbarAsideButton
