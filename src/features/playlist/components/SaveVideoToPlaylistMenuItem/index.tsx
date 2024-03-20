import type { FC, MouseEvent } from 'react'

import type { VideoId } from '@/features/video/types'
import { useSaveVideoToPlaylistsContext } from '@/features/playlist/hooks'

import MenuItem from '@/components/ui/MenuItem'

import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'

interface Props {
  videoId: VideoId
  onCloseMenu: () => void
}

const SaveVideoToPlaylistMenuItem: FC<Props> = ({ videoId, onCloseMenu }) => {
  const { onOpen } = useSaveVideoToPlaylistsContext()

  const handleSaveVideoToPlaylist = (event: MouseEvent) => {
    onOpen(videoId)
    onCloseMenu()
    event.stopPropagation()
  }

  return (
    <MenuItem
      startIcon={<PlaylistAddIcon />}
      onClick={handleSaveVideoToPlaylist}
    >
      Save to playlist
    </MenuItem>
  )
}

export default SaveVideoToPlaylistMenuItem
