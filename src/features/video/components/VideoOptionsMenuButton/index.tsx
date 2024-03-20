import type { FC } from 'react'

import { useMenu } from '@/hooks'

import type { VideoId } from '@/features/video/types'

import VideoOptionsMenu from '@/features/video/components/VideoOptionsMenu'

import { IconButton } from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert'

interface Props {
  videoId: VideoId
}

const VideoOptionsMenuButton: FC<Props> = ({ videoId }) => {
  const { anchorEl, onCloseMenu, onOpenMenu } = useMenu()

  return (
    <>
      <IconButton onClick={onOpenMenu}>
        <MoreVertIcon htmlColor='white' />
      </IconButton>

      <VideoOptionsMenu
        anchorEl={anchorEl}
        onClose={onCloseMenu}
        videoId={videoId}
      />
    </>
  )
}

export default VideoOptionsMenuButton
