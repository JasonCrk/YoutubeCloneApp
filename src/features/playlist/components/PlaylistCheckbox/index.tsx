import { useState, type FC } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import type { PlaylistItemToSaveVideoAdapter } from '@/features/playlist/models'
import type { VideoId } from '@/features/video/types'
import {
  useRemoveVideoFromPlaylist,
  useSaveVideoToPlaylist
} from '@/features/playlist/hooks'

import { Box, Checkbox, Typography } from '@mui/material'

import VisibilityIcon from '@/components/ui/VisibilityIcon'

interface Props extends PlaylistItemToSaveVideoAdapter {
  videoId: VideoId
}

const PlaylistCheckbox: FC<Props> = ({
  id: playlistId,
  isVideoSaved,
  name,
  visibility,
  videoId
}) => {
  const [isChecked, setIsChecked] = useState(isVideoSaved)

  const queryClient = useQueryClient()

  const { mutateSaveVideoToPlaylist } = useSaveVideoToPlaylist()
  const { mutateRemoveVideoFromPlaylist } = useRemoveVideoFromPlaylist()

  const handleRefetchPlaylists = () => {
    queryClient.invalidateQueries({
      queryKey: ['ownPlaylistsToSaveVideo', videoId]
    })
  }

  const handleSaveVideoToPlaylist = () => {
    setIsChecked(true)
    mutateSaveVideoToPlaylist(
      { playlistId, videoId },
      {
        onSuccess: handleRefetchPlaylists
      }
    )
  }

  const handleRemoveVideoFromPlaylist = () => {
    setIsChecked(false)
    mutateRemoveVideoFromPlaylist(
      { playlistId, videoId },
      {
        onSuccess: handleRefetchPlaylists
      }
    )
  }

  return (
    <Box
      display='flex'
      alignItems='center'
      gap={0.5}
      sx={{ cursor: 'pointer' }}
      onClick={
        isChecked ? handleRemoveVideoFromPlaylist : handleSaveVideoToPlaylist
      }
    >
      <Checkbox checked={isChecked} />

      <Typography
        component='p'
        flexGrow={1}
        textOverflow='ellipsis'
        title={name}
        noWrap
      >
        {name}
      </Typography>

      <VisibilityIcon visibility={visibility} />
    </Box>
  )
}

export default PlaylistCheckbox
