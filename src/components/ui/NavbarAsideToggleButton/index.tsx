import { FC, useContext } from 'react'

import { navbarAsideContext } from '@/contexts/NavbarAside'

import { IconButton } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'

const NavbarAsideToggleButton: FC = () => {
  const { toggleNavbarAside } = useContext(navbarAsideContext)

  return (
    <IconButton
      data-testid='NavbarAsideToggleButton'
      role='button'
      onClick={() => toggleNavbarAside()}
    >
      <MenuIcon />
    </IconButton>
  )
}

export default NavbarAsideToggleButton
