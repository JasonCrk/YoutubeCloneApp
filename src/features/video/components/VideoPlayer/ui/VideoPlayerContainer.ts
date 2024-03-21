import type { HTMLAttributes } from 'react'

import { styled } from '@mui/material'

interface VideoPlayerContainerProps extends HTMLAttributes<HTMLDivElement> {
  isTheaterViewMode: boolean
}

interface VideoPlayerControlsContainerProps
  extends HTMLAttributes<HTMLDialogElement> {
  isVideoPlaying: boolean
  isTheaterViewMode: boolean
}

export const VideoPlayerContainer = styled('div', {
  shouldForwardProp: prop => prop !== 'isTheaterViewMode'
})<VideoPlayerContainerProps>(({ isTheaterViewMode }) => ({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: isTheaterViewMode ? '100%' : undefined,
  marginInline: 'auto',
  '&:hover div': {
    opacity: 1,
    visibility: 'visible'
  }
}))

export const VideoPlayerControlsContainer = styled('div', {
  shouldForwardProp: prop =>
    prop != 'isVideoPlaying' && prop !== 'isTheaterViewMode'
})<VideoPlayerControlsContainerProps>(
  ({ isVideoPlaying, isTheaterViewMode }) => ({
    position: 'absolute',
    width: '100%',
    zIndex: 10,
    bottom: isTheaterViewMode ? 0 : 6,
    left: 0,
    visibility: isVideoPlaying ? 'hidden' : 'visible',
    transition: 'visibility 200ms, opacity 200ms',
    opacity: isVideoPlaying ? 0 : 1,
    background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.65))',
    borderRadius: '0 0 14px 14px'
  })
)
