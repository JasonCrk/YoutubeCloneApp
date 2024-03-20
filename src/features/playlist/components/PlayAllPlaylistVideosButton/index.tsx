import type { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import type { VideoId } from '@/features/video/types'
import type { PlaylistId } from '@/features/playlist/types'

import Button from '@/components/ui/Button'

import { grey } from '@mui/material/colors'

import PlayArrowIcon from '@mui/icons-material/PlayArrow'

interface Props {
  firstVideoId: VideoId
  playlistId: PlaylistId
}

const PlayAllPlaylistVideosButton: FC<Props> = ({
  firstVideoId,
  playlistId
}) => {
  const navigate = useNavigate()

  return (
    <Button
      onClick={() => navigate(`/watch?v=${firstVideoId}&list=${playlistId}`)}
      startIcon={<PlayArrowIcon />}
      variant='solid'
      color={grey[900]}
      sx={{
        flexGrow: 1,
        width: '100%',
        gap: 1,
        py: 0.75,
        lineHeight: 0.9,
        '&:hover': {
          bgcolor: grey[400]
        }
      }}
    >
      Play all
    </Button>
  )
}

export default PlayAllPlaylistVideosButton
