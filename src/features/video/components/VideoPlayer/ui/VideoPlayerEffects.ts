import type { HTMLAttributes } from 'react'

import { keyframes, styled } from '@mui/material'

const videoReproductionAnimation = keyframes`
  0% {
    opacity: 0.6;
    display: grid;
    transform: scale(0.8);
  }

  100% {
    opacity: 0;
    display: none;
    transform: scale(1.5);
  }
`

export const VideoPlayerEffectContainer = styled('div')(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  pointerEvents: 'none'
}))

interface VideoReproductionIconContainerProps
  extends HTMLAttributes<HTMLDivElement> {
  isAction: boolean
}

export const VideoReproductionIconContainer = styled('div', {
  shouldForwardProp: prop => prop !== 'isAction'
})<VideoReproductionIconContainerProps>(({ theme, isAction }) => ({
  opacity: 0.8,
  borderRadius: '999px',
  backgroundColor: theme.palette.background.default,
  color: 'white',
  padding: 15,
  aspectRatio: 1 / 1,
  display: isAction ? 'grid' : 'none',
  placeContent: 'center',
  animationIterationCount: 1,
  ...(isAction && {
    animation: `${videoReproductionAnimation} 1s ${theme.transitions.easing.easeOut}`
  })
}))
