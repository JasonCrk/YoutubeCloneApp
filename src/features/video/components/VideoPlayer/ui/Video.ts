import type { HTMLAttributes } from 'react'

import { styled } from '@mui/material'

interface VideoProps extends HTMLAttributes<HTMLVideoElement> {
  isTheaterViewMode: boolean
}

export const Video = styled('video', {
  shouldForwardProp: prop => prop !== 'isTheaterViewMode'
})<VideoProps>(({ isTheaterViewMode }) => ({
  aspectRatio: 16 / 9,
  borderRadius: isTheaterViewMode ? undefined : '14px',
  width: '100%',
  height: '100%',
  maxWidth: '1500px'
}))
