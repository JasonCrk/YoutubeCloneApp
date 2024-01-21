import { FC, MouseEvent, ReactNode } from 'react'

import { useNavigate } from 'react-router-dom'

import { MenuItem, MenuItemProps } from '@mui/material'

interface Props extends Omit<MenuItemProps, 'LinkComponent'> {
  linkHref?: string
  children: ReactNode
}

const MenuItemWrapper: FC<Props> = ({
  linkHref,
  children,
  onClick,
  ...props
}) => {
  const navigate = useNavigate()

  const handleLink = (
    event: MouseEvent<HTMLLIElement, globalThis.MouseEvent>
  ) => {
    if (linkHref) {
      event.preventDefault()
      navigate(linkHref)
    }

    if (onClick) onClick(event)
  }

  return (
    <MenuItem onClick={handleLink} sx={{ py: 1.1 }} {...props}>
      {children}
    </MenuItem>
  )
}

export default MenuItemWrapper
