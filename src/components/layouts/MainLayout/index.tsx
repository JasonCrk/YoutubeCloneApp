import { FC } from 'react'

import { Outlet } from 'react-router-dom'

import NavbarAsideProvider from '@/contexts/NavbarAside/Provider'

import AuthModalProvider from '@/features/auth/contexts/AuthModal/Provider'
import UploadVideoModalProvider from '@/features/video/contexts/UploadVideoModal/Provider'

import TopBar from '@/components/ui/TopBar'
import NavbarAside from '@/components/ui/NavbarAside'

import { Box } from '@mui/material'

const MainLayout: FC = () => {
  return (
    <NavbarAsideProvider>
      <AuthModalProvider>
        <UploadVideoModalProvider>
          <TopBar />
          <Box display={'flex'}>
            <NavbarAside />
            <Outlet />
          </Box>
        </UploadVideoModalProvider>
      </AuthModalProvider>
    </NavbarAsideProvider>
  )
}

export default MainLayout
