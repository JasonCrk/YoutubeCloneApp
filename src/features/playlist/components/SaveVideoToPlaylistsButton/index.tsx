import type { FC } from 'react'

import type { VideoId } from '@/features/video/types'
import { useSaveVideoToPlaylistsContext } from '@/features/playlist/hooks'

import Button from '@/components/ui/Button'

import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'

import { grey } from '@mui/material/colors'

interface Props {
  videoId: VideoId
}

const SaveVideoToPlaylistButton: FC<Props> = ({ videoId }) => {
  const { onOpen } = useSaveVideoToPlaylistsContext()

  return (
    <Button
      variant='solid'
      bgcolor={grey[900]}
      startIcon={<PlaylistAddIcon />}
      sx={{ gap: 0.5 }}
      onClick={() => onOpen(videoId)}
    >
      Save
    </Button>
  )
}

export default SaveVideoToPlaylistButton
