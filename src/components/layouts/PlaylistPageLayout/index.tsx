import type { FC } from 'react'

import { Outlet, useLoaderData } from 'react-router-dom'

import type { PlaylistId } from '@/features/playlist/types'
import { useFetchPlaylistDetails } from '@/features/playlist/hooks'

import PlaylistPageSkeleton from '@/components/ui/PlaylistPageSkeleton'

import SidePlaylistDetails from '@/features/playlist/components/SidePlaylistDetails'

import { Box, Container, useMediaQuery, useTheme } from '@mui/material'

const PlaylistPageLayout: FC = () => {
  const { playlistId } = useLoaderData() as { playlistId: PlaylistId }

  const theme = useTheme()
  const isDisableGutters = useMediaQuery(theme.breakpoints.down('md'))

  const { isSuccess, playlist, isLoading, isError, error } =
    useFetchPlaylistDetails(playlistId)

  if (isLoading)
    return <PlaylistPageSkeleton disableGutters={isDisableGutters} />

  if (isError)
    return (
      <Box mt='80px' mx={4} mb={4} py={2} px={3} bgcolor='red' color='white'>
        {error.message}
      </Box>
    )

  if (isSuccess && playlist)
    return (
      <Container
        disableGutters={isDisableGutters}
        maxWidth='xl'
        component='main'
        sx={{
          mt: { xs: '56px', md: '80px' },
          display: 'grid',
          color: 'white',
          gap: 0.5,
          gridTemplateColumns: { xs: '1fr', md: '360px 1fr' },
          '&.MuiContainer-maxWidthXl': {
            paddingX: { xs: 0, md: '36px' }
          }
        }}
      >
        <SidePlaylistDetails {...playlist} />
        <Outlet context={playlist} />
      </Container>
    )
}

export default PlaylistPageLayout
