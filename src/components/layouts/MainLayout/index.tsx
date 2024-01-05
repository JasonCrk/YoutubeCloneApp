import { FC } from 'react'

import { Outlet } from 'react-router-dom'

import NavbarAsideProvider from '@/contexts/NavbarAside/Provider'

import AuthModalProvider from '@/features/auth/contexts/AuthModal/Provider'

import TopBar from '@/components/ui/TopBar'
import NavbarAside from '@/components/ui/NavbarAside'

import { Box } from '@mui/material'

const MainLayout: FC = () => {
  return (
    <NavbarAsideProvider>
      <AuthModalProvider>
        <TopBar />
        <Box display={'flex'}>
          <NavbarAside />
          <Outlet />
        </Box>
      </AuthModalProvider>
    </NavbarAsideProvider>
  )
}

export default MainLayout
