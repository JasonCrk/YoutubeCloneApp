import { FC, ReactNode } from 'react'

import MenuItemWrapper from '@/components/ui/MenuItemWrapper'

import { ListItemIcon, ListItemText, MenuItemProps } from '@mui/material'

interface Props extends Omit<MenuItemProps, 'LinkComponent'> {
  startIcon?: ReactNode
  endIcon?: ReactNode
  children: string
  linkHref?: string
}

const MenuItem: FC<Props> = ({
  startIcon,
  endIcon,
  children,
  linkHref,
  onClick,
  ...props
}) => {
  return (
    <MenuItemWrapper linkHref={linkHref} onClick={onClick} {...props}>
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
