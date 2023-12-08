import { FC } from 'react'

import { IconButton } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'

const NavbarAsideToggleButton: FC = () => {
  const handleToggleOpen = () => {}

  return (
    <IconButton
      data-testid='NavbarAsideToggleButton'
      role='button'
      onClick={handleToggleOpen}
    >
      <MenuIcon />
    </IconButton>
  )
}

export default NavbarAsideToggleButton
