import type { HTMLAttributes } from 'react'

import { styled } from '@mui/material'

interface VideoPlayerContainerProps extends HTMLAttributes<HTMLDivElement> {
  isTheaterViewMode: boolean
}

interface VideoPlayerControlsContainerProps
  extends HTMLAttributes<HTMLDialogElement> {
  isVideoPlaying: boolean
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
  shouldForwardProp: prop => prop != 'isVideoPlaying'
})<VideoPlayerControlsContainerProps>(({ isVideoPlaying }) => ({
  position: 'absolute',
  width: '100%',
  zIndex: 10,
  bottom: 6,
  left: 0,
  visibility: isVideoPlaying ? 'hidden' : 'visible',
  transition: 'visibility 200ms, opacity 200ms',
  opacity: isVideoPlaying ? 0 : 1
}))
