import type { FC } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import type { PlaylistId, PlaylistVideoId } from '@/features/playlist/types'
import { useUpdatePlaylist } from '@/features/playlist/hooks'

import MenuItem from '@/components/ui/MenuItem'

import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'

interface Props {
  onClose: () => void
  playlistId: PlaylistId
  playlistVideoId: PlaylistVideoId
}

const SetPlaylistThumbnailMenuItem: FC<Props> = ({
  onClose,
  playlistId,
  playlistVideoId
}) => {
  const queryClient = useQueryClient()

  const { mutateUpdatePlaylist } = useUpdatePlaylist()

  const handleSetPlaylistThumbnail = () => {
    mutateUpdatePlaylist(
      { playlistId, data: { video_thumbnail: playlistVideoId } },
      {
        onSuccess: () => {
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
      startIcon={<ImageOutlinedIcon />}
      onClick={handleSetPlaylistThumbnail}
    >
      Set as playlist thumbnail
    </MenuItem>
  )
}

export default SetPlaylistThumbnailMenuItem
