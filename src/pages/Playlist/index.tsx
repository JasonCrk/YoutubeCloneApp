import type { FC } from 'react'

import { useOutletContext } from 'react-router-dom'

import { useAppSelector } from '@/store/hooks'

import { useFetchPlaylistVideos } from '@/features/playlist/hooks'

import PlaylistVideoList from '@/features/playlist/components/PlaylistVideoList'
import PlaylistVideoListDragAndDrop from '@/features/playlist/components/PlaylistVideoListDragAndDrop'

import { Box, CircularProgress, Typography, colors } from '@mui/material'

import { PlaylistDetailsAdapter } from '@/features/playlist/models'

const PlaylistPage: FC = () => {
  const {
    id: playlistId,
    channel,
    name: playlistName,
    firstVideoId
  } = useOutletContext() as PlaylistDetailsAdapter

  const { isAuth, user } = useAppSelector(state => state.auth)

  const { isLoading, isError, error, playlistVideos, isSuccess } =
    useFetchPlaylistVideos(playlistId)

  if (isLoading)
    return (
      <Box flexGrow={1} display='flex' justifyContent='center'>
        <CircularProgress sx={{ width: '50px', mt: 2 }} color='inherit' />
      </Box>
    )

  if (isError)
    return (
      <Box flexGrow={1}>
        <Typography textAlign='center' py={1} m={2} bgcolor={colors.red[600]}>
          {error.message}
        </Typography>
      </Box>
    )

  if (isSuccess && playlistVideos) {
    if (playlistVideos.length === 0)
      return (
        <Typography flexGrow={1} width='100%' textAlign='center'>
          No videos in this playlist yet
        </Typography>
      )

    if (isAuth && user?.currentChannel.id === channel.id)
      return (
        <PlaylistVideoListDragAndDrop
          playlistVideos={playlistVideos}
          playlist={{
            channelId: channel.id,
            id: playlistId,
            name: playlistName,
            firstVideoId
          }}
        />
      )

    return (
      <PlaylistVideoList
        playlistVideos={playlistVideos}
        playlist={{
          channelId: channel.id,
          id: playlistId,
          name: playlistName,
          firstVideoId
        }}
      />
    )
  }
}

export default PlaylistPage
