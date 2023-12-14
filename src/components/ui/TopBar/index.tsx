import { FC } from 'react'

import SearchField from '@components/form/SearchField'

import NavbarAsideToggleButton from '@components/ui/NavbarAsideToggleButton'
import TopBarOptions from '@components/ui/TopBarOptions'
import Logo from '@components/ui/Logo'

import { AppBar, Box, Toolbar } from '@mui/material'

const TopBar: FC = () => {
  return (
    <AppBar data-testid='TopBar' elevation={0}>
      <Toolbar
        variant='dense'
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'background.default',
          height: '56px'
        }}
      >
        <Box display={'flex'} gap={2} alignItems={'center'}>
          <NavbarAsideToggleButton />
          <Logo />
        </Box>

        <SearchField />

        <TopBarOptions />
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
