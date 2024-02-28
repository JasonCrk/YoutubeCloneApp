import type { FC } from 'react'

import type { VideoId } from '@/features/video/types'
import { useFetchOwnPlaylistsToSaveVideo } from '@/features/playlist/hooks'

import PlaylistCheckbox from '@/features/playlist/components/PlaylistCheckbox'

import { Box, CircularProgress, Stack } from '@mui/material'

import { red } from '@mui/material/colors'

interface Props {
  videoId: VideoId
}

const PlaylistCheckboxList: FC<Props> = ({ videoId }) => {
  const { playlistsToSaveVideo, isLoading, isError, error, isSuccess } =
    useFetchOwnPlaylistsToSaveVideo(videoId)

  if (isLoading)
    return (
      <Box display='flex' justifyContent='center' py={2}>
        <CircularProgress color='inherit' />
      </Box>
    )

  if (isError)
    return (
      <Box textAlign='center' py={2} color={red[500]}>
        {error.message}
      </Box>
    )

  if (playlistsToSaveVideo?.length === 0)
    return (
      <Box textAlign='center' py={2}>
        Doesn't have any playlist
      </Box>
    )

  if (isSuccess && playlistsToSaveVideo)
    return (
      <Stack spacing={1} py={2}>
        {playlistsToSaveVideo.map(playlist => (
          <PlaylistCheckbox key={playlist.id} {...playlist} videoId={videoId} />
        ))}
      </Stack>
    )
}

export default PlaylistCheckboxList
