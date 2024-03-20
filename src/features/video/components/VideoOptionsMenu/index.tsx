import type { FC } from 'react'

import type { VideoId } from '@/features/video/types'

import { Menu } from '@mui/material'

import SaveVideoToPlaylistMenuItem from '@/features/playlist/components/SaveVideoToPlaylistMenuItem'

interface Props {
  anchorEl: HTMLElement | null
  videoId: VideoId
  onClose: () => void
}

const VideoOptionsMenu: FC<Props> = ({ anchorEl, videoId, onClose }) => {
  return (
    <Menu
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorEl={anchorEl}
      slotProps={{ paper: { sx: { backgroundColor: 'background.paper' } } }}
    >
      <SaveVideoToPlaylistMenuItem onCloseMenu={onClose} videoId={videoId} />
    </Menu>
  )
}

export default VideoOptionsMenu
