import { styled } from '@mui/material'

export const VideoPlayerVolumenContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  ':hover input, input:focus-within': {
    width: '100px',
    transform: 'scaleX(1)'
  }
}))

export const VideoPlayerVolumenSlider = styled('input')(() => ({
  width: 0,
  transformOrigin: 'left',
  transform: 'scaleX(0)',
  transition: 'width 150ms ease-in-out, transform 150ms ease-in-out'
}))
