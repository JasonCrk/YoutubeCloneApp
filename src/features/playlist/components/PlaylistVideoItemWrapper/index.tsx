import { forwardRef, type ReactNode } from 'react'

import { useAppSelector } from '@/store/hooks'

import type { PlaylistVideoItemAdapter } from '@/features/playlist/models'
import { PlaylistDataProps } from '@/features/playlist/components/PlaylistVideoItem/types'

import PlaylistVideoOptionsMenuButton from '@/features/playlist/components/PlaylistVideoOptionsMenuButton'

import Box, { type BoxProps } from '@mui/material/Box'

import grey from '@mui/material/colors/grey'

interface Props extends BoxProps {
  playlistVideo: PlaylistVideoItemAdapter
  totalVideos: number
  playlist: PlaylistDataProps
  children: ReactNode
}

const PlaylistVideoItemWrapper = forwardRef(
  (
    { children, playlist, playlistVideo, totalVideos, ...boxProps }: Props,
    ref
  ) => {
    const isAuth = useAppSelector(state => state.auth.isAuth)

    return (
      <Box
        ref={ref}
        position='relative'
        component='article'
        borderRadius='10px'
        display='flex'
        width='100%'
        {...boxProps}
        sx={{
          textDecoration: 'none',
          color: 'white',
          '&:hover': { backgroundColor: grey[900] },
          '&:hover .playlistVideoOptionsMenuButton': { visibility: 'visible' },
          '&:not(:hover) .playlistVideoOptionsMenuButton': {
            visibility: 'hidden'
          }
        }}
      >
        {children}

        {isAuth && (
          <Box
            position='absolute'
            top='50%'
            right={0}
            sx={{ transform: 'translateY(-50%)', visibility: 'hidden' }}
            className='playlistVideoOptionsMenuButton'
          >
            <PlaylistVideoOptionsMenuButton
              totalVideos={totalVideos}
              playlist={playlist}
              playlistVideo={playlistVideo}
            />
          </Box>
        )}
      </Box>
    )
  }
)

export default PlaylistVideoItemWrapper
