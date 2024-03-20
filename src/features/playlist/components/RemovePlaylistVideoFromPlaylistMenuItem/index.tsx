import type { FC } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import type {
  PlaylistId,
  PlaylistName,
  PlaylistVideoPosition
} from '@/features/playlist/types'
import { useRemoveVideoFromPlaylist } from '@/features/playlist/hooks'

import type { VideoId } from '@/features/video/types'

import MenuItem from '@/components/ui/MenuItem'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

interface Props {
  onCloseMenu: () => void
  playlistVideo: {
    position: PlaylistVideoPosition
    videoId: VideoId
  }
  playlist: {
    id: PlaylistId
    name: PlaylistName
    firstVideoId: VideoId | null
  }
}

const RemovePlaylistVideoFromPlaylistMenuItem: FC<Props> = ({
  playlist,
  playlistVideo,
  onCloseMenu
}) => {
  const queryClient = useQueryClient()

  const { mutateRemoveVideoFromPlaylist } = useRemoveVideoFromPlaylist()

  const handleRemovePlaylistVideoFromPlaylist = () => {
    mutateRemoveVideoFromPlaylist(
      { playlistId: playlist.id, videoId: playlistVideo.videoId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['playlistVideos', playlist.id]
          })

          if (
            playlistVideo.position === 0 ||
            playlist.firstVideoId === playlistVideo.videoId
          )
            queryClient.invalidateQueries({
              queryKey: ['playlistDetails', playlist.id]
            })
        },
        onError: () => {
          onCloseMenu()
        }
      }
    )
  }

  return (
    <MenuItem
      startIcon={<DeleteOutlinedIcon />}
      onClick={handleRemovePlaylistVideoFromPlaylist}
    >
      Remove from {playlist.name}
    </MenuItem>
  )
}

export default RemovePlaylistVideoFromPlaylistMenuItem
