import type { FC } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import type {
  PlaylistId,
  PlaylistVideoId,
  PlaylistVideoPosition
} from '@/features/playlist/types'
import { useRepositionPlaylistVideo } from '@/features/playlist/hooks'

import MenuItem from '@/components/ui/MenuItem'

import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom'

interface Props {
  onClose: () => void
  playlistId: PlaylistId
  playlistVideoId: PlaylistVideoId
  playlistVideoPosition: PlaylistVideoPosition
  totalVideos: number
}

const MovePlaylistVideoToBottom: FC<Props> = ({
  onClose,
  playlistId,
  playlistVideoId,
  playlistVideoPosition,
  totalVideos
}) => {
  const queryClient = useQueryClient()

  const { mutateRepositionPlaylistVideo } = useRepositionPlaylistVideo()

  const handleMovePlaylistVideoToBottom = () => {
    mutateRepositionPlaylistVideo(
      {
        newPlaylistVideoPosition: totalVideos - 1,
        playlistId,
        playlistVideoId
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['playlistVideos', playlistId]
          })

          if (playlistVideoPosition === 0)
            queryClient.invalidateQueries({
              queryKey: ['playlistDetails', playlistId]
            })

          onClose()
        },
        onError: () => {
          onClose()
        }
      }
    )
  }

  return (
    <MenuItem
      startIcon={<VerticalAlignBottomIcon />}
      onClick={handleMovePlaylistVideoToBottom}
    >
      Move to top
    </MenuItem>
  )
}

export default MovePlaylistVideoToBottom
