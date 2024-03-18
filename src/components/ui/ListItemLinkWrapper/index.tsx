import type { FC, MouseEvent, ReactNode } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { ListItem, ListItemButton } from '@mui/material'

import { grey } from '@mui/material/colors'

interface Props {
  children: (isActive: boolean) => ReactNode
  href: string
  testId?: string
}

const ListItemLinkWrapper: FC<Props> = ({ children, href, testId }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive =
    location.pathname.length > 1
      ? href === '/'
        ? false
        : location.pathname.startsWith(href)
      : href === '/'

  const handleLink = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigate(href)
  }

  return (
    <ListItem disablePadding data-testid={testId}>
      <ListItemButton
        role='link'
        LinkComponent='a'
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
        {children && children(isActive)}
      </ListItemButton>
    </ListItem>
  )
}

export default ListItemLinkWrapper
