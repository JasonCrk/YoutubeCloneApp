import type { FC } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import type {
  PlaylistId,
  PlaylistVideoId,
  PlaylistVideoPosition
} from '@/features/playlist/types'
import { useRepositionPlaylistVideo } from '@/features/playlist/hooks'

import MenuItem from '@/components/ui/MenuItem'

import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop'

interface Props {
  playlistVideoId: PlaylistVideoId
  playlistId: PlaylistId
  playlistVideoPosition: PlaylistVideoPosition
  onClose: () => void
}

const MovePlaylistVideoToTop: FC<Props> = ({
  playlistVideoId,
  playlistId,
  playlistVideoPosition,
  onClose
}) => {
  const { mutateRepositionPlaylistVideo } = useRepositionPlaylistVideo()

  const queryClient = useQueryClient()

  const handleMovePlaylistVideoToTop = () => {
    if (playlistVideoPosition === 0) return

    mutateRepositionPlaylistVideo(
      { newPlaylistVideoPosition: 0, playlistId, playlistVideoId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['playlistVideos', playlistId]
          })

          queryClient.invalidateQueries({
            queryKey: ['playlistDetails', playlistId]
          })

          onClose()
        }
      }
    )
  }

  return (
    <MenuItem
      startIcon={<VerticalAlignTopIcon />}
      onClick={handleMovePlaylistVideoToTop}
    >
      Move to top
    </MenuItem>
  )
}

export default MovePlaylistVideoToTop
