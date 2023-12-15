import { Interpolation, Theme } from '@mui/material'

import { theme } from '.'

export const globalStyles: Interpolation<Theme> = {
  '&::-webkit-scrollbar': {
    width: '16px'
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.background.default
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#CCC',
    borderRadius: '25px',
    backgroundClip: 'content-box',
    border: '4px solid transparent'
  },
  '&': {
    scrollBehavior: 'smooth'
  }
}
