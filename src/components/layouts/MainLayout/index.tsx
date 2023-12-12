import { FC } from 'react'

import { Outlet } from 'react-router-dom'

import NavbarAsideProvider from '@contexts/NavbarAside/Provider'

import TopBar from '@components/ui/TopBar'
import NavbarAside from '@components/ui/NavbarAside'

import { Box } from '@mui/material'

const MainLayout: FC = () => {
  return (
    <NavbarAsideProvider>
      <TopBar />
      <Box display={'flex'} mt={7}>
        <NavbarAside />
        <Outlet />
      </Box>
    </NavbarAsideProvider>
  )
}

export default MainLayout
