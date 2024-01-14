import { FC, useContext } from 'react'

import { uploadVideoModalContext } from '@/features/video/contexts/UploadVideoModal'

import { IconButton, Tooltip, Zoom } from '@mui/material'

import SlideshowIcon from '@mui/icons-material/Slideshow'

const UploadVideoButton: FC = () => {
  const { onOpen } = useContext(uploadVideoModalContext)

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
