import { FC, MouseEvent, ReactNode } from 'react'

import { useNavigate } from 'react-router-dom'

import {
  ListItemIcon,
  ListItemText,
  MenuItem as MaterialMenuItem,
  MenuItemProps
} from '@mui/material'

interface Props extends Omit<MenuItemProps, 'LinkComponent'> {
  iconStart?: ReactNode
  iconEnd?: ReactNode
  children: string
  link?: {
    href: string
  }
}

const MenuItem: FC<Props> = ({
  iconStart,
  iconEnd,
  link,
  children,
  onClick,
  ...props
}) => {
  const navigate = useNavigate()

  const handleLink = (
    event: MouseEvent<HTMLLIElement, globalThis.MouseEvent>
  ) => {
    if (link) {
      event.preventDefault()
      navigate(link.href)
    }

    if (onClick) onClick(event)
  }

  return (
    <MaterialMenuItem onClick={handleLink} sx={{ py: 1.1 }} {...props}>
      {iconStart && <ListItemIcon>{iconStart}</ListItemIcon>}

      <ListItemText
        primaryTypographyProps={{ fontSize: '0.9rem' }}
        primary={children}
      />

      {iconEnd && iconEnd}
    </MaterialMenuItem>
  )
}

export default MenuItem
