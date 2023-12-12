import { FC, useContext } from 'react'

import { NavbarAsideState, navbarAsideContext } from '@contexts/NavbarAside'

import FullNavbarAside from './FullNavbarAside'

import { Box } from '@mui/material'

const NavbarAside: FC = () => {
  const { state } = useContext(navbarAsideContext)

  if (state === NavbarAsideState.FULL) return <FullNavbarAside />

  if (state === NavbarAsideState.SHORT)
    return <Box data-testid='ShortNavbarAside'>short</Box>

  return null
}

export default NavbarAside
