import { styled } from '@mui/material'

export const VideoPlayerEffectContainer = styled('div')(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}))

export const VideoReproduction = styled('div')(({ theme }) => ({
  opacity: '10%',
  borderRadius: '999px',
  backgroundColor: theme.palette.background.default,
  color: 'white',
  padding: 15,
  aspectRatio: 1 / 1,
  display: 'grid',
  placeContent: 'center'
}))
