import { FC } from 'react'

import { IconButton, Tooltip, Zoom } from '@mui/material'

import SlideshowIcon from '@mui/icons-material/Slideshow'

const UploadVideoButton: FC = () => {
  return (
    <Tooltip title='Upload video' TransitionComponent={Zoom}>
      <IconButton data-testid='UploadVideoButton' role='button'>
        <SlideshowIcon />
      </IconButton>
    </Tooltip>
  )
}

export default UploadVideoButton
