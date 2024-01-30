import type { FC } from 'react'

import { useNavbarAsideContext } from '@/hooks'

import { IconButton } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'

const NavbarAsideToggleButton: FC = () => {
  const { toggleNavbarAside } = useNavbarAsideContext()

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
