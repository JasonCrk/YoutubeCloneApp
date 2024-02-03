import type { FC } from 'react'

import { useUploadVideoModalContext } from '@/features/video/hooks'

import { IconButton, Tooltip, Zoom } from '@mui/material'

import SlideshowIcon from '@mui/icons-material/Slideshow'

const UploadVideoButton: FC = () => {
  const { onOpen } = useUploadVideoModalContext()

  return (
    <Tooltip title='Upload video' TransitionComponent={Zoom}>
      <IconButton
        data-testid='UploadVideoButton'
        role='button'
        onClick={onOpen}
      >
        <SlideshowIcon />
      </IconButton>
    </Tooltip>
  )
}

export default UploadVideoButton
