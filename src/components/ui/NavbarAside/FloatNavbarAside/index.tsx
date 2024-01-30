import type { FC } from 'react'

import { NavbarAsideState } from '@/contexts/NavbarAside'

import { useNavbarAsideContext } from '@/hooks'

import FullNavbarAside from '@/components/ui/NavbarAside/FullNavbarAside'
import NavbarAsideToggleButton from '@/components/ui/NavbarAsideToggleButton'
import Logo from '@/components/ui/Logo'

import { Box, Drawer } from '@mui/material'

const FloatNavbarAside: FC = () => {
  const { state, toggleNavbarAside } = useNavbarAsideContext()

  const isOpen = state === NavbarAsideState.FLOAT

  return (
    <Drawer
      data-testid='FloatNavbarAside'
      anchor='left'
      open={isOpen}
      onClose={toggleNavbarAside}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        height={'56px'}
        pl={3}
        bgcolor={'background.default'}
        gap={2}
      >
        <NavbarAsideToggleButton />
        <Logo />
      </Box>

      <FullNavbarAside disablePaddingTop />
    </Drawer>
  )
}

export default FloatNavbarAside
