import type { HTMLAttributes } from 'react'

import { styled } from '@mui/material'

interface VideoThumbnailFieldContainerProps
  extends HTMLAttributes<HTMLDivElement> {
  error?: boolean
}

export const VideoThumbnailFieldContainer = styled('div', {
  shouldForwardProp: prop => prop !== 'error'
})<VideoThumbnailFieldContainerProps>(({ theme, error }) => ({
  display: 'flex',
  backgroundColor: theme.palette.grey[800],
  borderRadius: '15px',
  width: '100%',
  position: 'relative',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: error ? theme.palette.error.main : theme.palette.grey[700],
  aspectRatio: 16 / 9
}))

interface VideoThumbnailFieldLabelProps
  extends HTMLAttributes<HTMLLabelElement> {
  error?: boolean
}

export const VideoThumbnailFieldLabel = styled('label', {
  shouldForwardProp: prop => prop !== 'error'
})<VideoThumbnailFieldLabelProps>(({ theme, error }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: error ? theme.palette.error.main : theme.palette.grey[900],
  opacity: '60%',
  padding: '5px',
  borderRadius: '100%',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}))

export const VideoThumbnailFieldError = styled('p')(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: '0.75rem',
  margin: 0,
  marginTop: '5px'
}))
