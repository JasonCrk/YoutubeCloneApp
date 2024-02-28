import type { FC, MouseEvent } from 'react'

import { useAppSelector } from '@/store/hooks'

import MenuItem from '@/components/ui/MenuItem'

import type { VideoId } from '@/features/video/types'

import { useSaveVideoToPlaylistsContext } from '@/features/playlist/hooks'

import { Menu } from '@mui/material'

import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'

interface Props {
  anchorEl: HTMLElement | null
  videoId: VideoId
  onClose: () => void
}

const VideoOptionsMenu: FC<Props> = ({ anchorEl, videoId, onClose }) => {
  const isAuth = useAppSelector(state => state.auth.isAuth)

  const { onOpen } = useSaveVideoToPlaylistsContext()

  const handleSaveVideoToPlaylist = (event: MouseEvent<HTMLElement>) => {
    if (isAuth) onOpen(videoId)
    event.stopPropagation()
  }

  const handleCloseMenu = () => {
    onClose()
  }

  return (
    <Menu
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
      anchorEl={anchorEl}
      slotProps={{ paper: { sx: { backgroundColor: 'background.paper' } } }}
    >
      <MenuItem
        startIcon={<PlaylistAddIcon />}
        onClick={handleSaveVideoToPlaylist}
      >
        Save to playlist
      </MenuItem>
    </Menu>
  )
}

export default VideoOptionsMenu
