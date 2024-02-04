import type { FC } from 'react'

import { Outlet } from 'react-router-dom'

import { NavbarAsideProvider } from '@/contexts/NavbarAside/provider'

import AuthModalProvider from '@/features/auth/contexts/AuthModal/Provider'
import UploadVideoModalProvider from '@/features/video/contexts/UploadVideoModal/Provider'
import CreateChannelModalProvider from '@/features/channel/contexts/CreateChannelModal/Provider'

import TopBar from '@/components/ui/TopBar'
import NavbarAside from '@/components/ui/NavbarAside'

import { Box } from '@mui/material'

const MainLayout: FC = () => {
  return (
    <NavbarAsideProvider>
      <AuthModalProvider>
        <UploadVideoModalProvider>
          <CreateChannelModalProvider>
            <TopBar />
            <Box display={'flex'}>
              <NavbarAside />
              <Outlet />
            </Box>
          </CreateChannelModalProvider>
        </UploadVideoModalProvider>
      </AuthModalProvider>
    </NavbarAsideProvider>
  )
}

export default MainLayout
