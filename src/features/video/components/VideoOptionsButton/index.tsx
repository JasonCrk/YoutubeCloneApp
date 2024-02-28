import { useState, type FC, type MouseEvent } from 'react'

import type { VideoId } from '@/features/video/types'

import VideoOptionsMenu from '@/features/video/components/VideoOptionsMenu'

import { IconButton } from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert'

interface Props {
  videoId: VideoId
}

const VideoOptionsButton: FC<Props> = ({ videoId }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton onClick={handleOpenMenu}>
        <MoreVertIcon htmlColor='white' />
      </IconButton>

      <VideoOptionsMenu
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        videoId={videoId}
      />
    </>
  )
}

export default VideoOptionsButton
