import { styled } from '@mui/material'

export const VideoPlayerTimelineContainer = styled('div')(() => ({
  height: '7px',
  marginInline: '10px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  '&:hover .timeline': {
    height: '100%'
  },
  '&:hover .timeline-thumb': {
    '--scale': 1
  },
  '&:hover .timeline::before': {
    display: 'block'
  }
}))

export const VideoPlayerTimeline = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[600],
  height: '3px',
  position: 'relative',
  width: '100%',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 'calc(100% - var(--preview-progress) * 100%)',
    backgroundColor: 'rgb(150, 150, 150)'
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 'calc(100% - var(--progress-position) * 100%)',
    backgroundColor: 'red'
  }
}))

export const VideoPlayerTimelineThumb = styled('div')(() => ({
  '--scale': 0,
  position: 'absolute',
  height: '200%',
  top: '-50%',
  transform: 'translateX(-50%) scale(var(--scale))',
  left: 'calc(var(--progress-position) * 100%)',
  borderRadius: '50%',
  transition: 'transform 150ms ease-in-out',
  aspectRatio: 1 / 1,
  backgroundColor: 'red'
}))
