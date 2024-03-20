import type { FC } from 'react'

import { Outlet } from 'react-router-dom'

import AuthModalProvider from '@/features/auth/contexts/AuthModal/Provider'
import UploadVideoModalProvider from '@/features/video/contexts/UploadVideoModal/Provider'
import CreateChannelModalProvider from '@/features/channel/contexts/CreateChannelModal/Provider'
import SaveVideoToPlaylistsProvider from '@/features/playlist/contexts/SaveVideoToPlaylists/Provider'
import DeletePlaylistModalProvider from '@/features/playlist/contexts/DeletePlaylistModal/Provider'

import TopBar from '@/components/ui/TopBar'
import NavbarAside from '@/components/ui/NavbarAside'

import Box from '@mui/material/Box'

const BaseLayout: FC = () => {
  return (
    <AuthModalProvider>
      <UploadVideoModalProvider>
        <CreateChannelModalProvider>
          <SaveVideoToPlaylistsProvider>
            <DeletePlaylistModalProvider>
              <TopBar />
              <Box display='flex'>
                <NavbarAside />
                <Outlet />
              </Box>
            </DeletePlaylistModalProvider>
          </SaveVideoToPlaylistsProvider>
        </CreateChannelModalProvider>
      </UploadVideoModalProvider>
    </AuthModalProvider>
  )
}

export default BaseLayout
