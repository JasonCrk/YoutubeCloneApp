import type { FC, ReactNode } from 'react'

import MenuItemWrapper from '@/components/ui/MenuItemWrapper'

import { ListItemIcon, ListItemText, MenuItemProps } from '@mui/material'

interface Props extends Omit<MenuItemProps, 'LinkComponent'> {
  startIcon?: ReactNode
  endIcon?: ReactNode
  children: ReactNode
  linkHref?: string
}

const MenuItem: FC<Props> = ({
  startIcon,
  endIcon,
  children,
  onClick,
  ...props
}) => {
  return (
    <MenuItemWrapper onClick={onClick} {...props}>
      {startIcon && <ListItemIcon>{startIcon}</ListItemIcon>}

      <ListItemText
        primaryTypographyProps={{ fontSize: '0.9rem' }}
        primary={children}
      />

      {endIcon && endIcon}
    </MenuItemWrapper>
  )
}

export default MenuItem
