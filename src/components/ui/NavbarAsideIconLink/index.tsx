import { FC, MouseEvent, ReactNode } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'

interface Props {
  href: string
  activeIcon: ReactNode
  noActiveIcon: ReactNode
  title: string
}

const NavbarAsideIconLink: FC<Props> = ({
  href,
  activeIcon,
  noActiveIcon,
  title
}) => {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = location.pathname === href

  const handleLink = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigate(href)
  }

  return (
    <ListItem disablePadding data-testid='NavbarAsideIconLink'>
      <ListItemButton
        LinkComponent={'a'}
        href={href}
        onClick={handleLink}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          px: 0.7,
          py: 2,
          borderRadius: '10px',
          backgroundColor: 'transparent'
        }}
      >
        <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
          {isActive ? activeIcon : noActiveIcon}
        </ListItemIcon>
        <ListItemText
          primary={title}
          primaryTypographyProps={{
            fontFamily: 'Youtube, sans-serif',
            fontSize: '0.7rem',
            lineHeight: 1
          }}
        />
      </ListItemButton>
    </ListItem>
  )
}

export default NavbarAsideIconLink
