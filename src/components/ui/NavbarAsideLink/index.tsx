import { FC, MouseEvent, ReactElement } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TypographyProps
} from '@mui/material'

import { grey } from '@mui/material/colors'

interface Props {
  activeIcon: ReactElement
  href: string
  title: string
  reverse?: boolean
  noActiveIcon?: ReactElement
  titleProps?: TypographyProps<'span'>
}

const NavbarAsideLink: FC<Props> = ({
  activeIcon,
  noActiveIcon,
  title,
  href,
  reverse,
  titleProps
}) => {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = location.pathname === href

  const handleLink = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigate(href)
  }

  return (
    <ListItem disablePadding>
      <ListItemButton
        LinkComponent={'a'}
        href={href}
        onClick={handleLink}
        sx={{
          borderRadius: '8px',
          backgroundColor: isActive ? 'background.paper' : 'background.default',
          ':hover': {
            backgroundColor: isActive ? grey[800] : 'background.paper'
          }
        }}
      >
        {reverse ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ListItemText
                primary={title}
                primaryTypographyProps={{
                  fontFamily: 'Youtube, sans-serif',
                  fontWeight: isActive ? 'bold' : 'normal',
                  fontSize: '0.9rem',
                  lineHeight: 1,
                  ...titleProps
                }}
              />
              <ListItemIcon sx={{ minWidth: '45px' }}>
                {isActive ? activeIcon : noActiveIcon ?? activeIcon}
              </ListItemIcon>
            </div>
          </>
        ) : (
          <>
            <ListItemIcon sx={{ minWidth: '45px' }}>
              {isActive ? activeIcon : noActiveIcon ?? activeIcon}
            </ListItemIcon>
            <ListItemText
              primary={title}
              primaryTypographyProps={{
                fontFamily: 'Youtube, sans-serif',
                fontWeight: isActive ? 'bold' : 'normal',
                fontSize: '0.9rem',
                lineHeight: 1,
                ...titleProps
              }}
            />
          </>
        )}
      </ListItemButton>
    </ListItem>
  )
}

export default NavbarAsideLink
