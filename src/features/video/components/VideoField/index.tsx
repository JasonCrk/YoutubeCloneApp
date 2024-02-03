import { ChangeEvent, FC, useState } from 'react'

import { UseFormSetValue } from 'react-hook-form'

import { Box, Typography, useTheme } from '@mui/material'

import SmartDisplayIcon from '@mui/icons-material/SmartDisplay'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>
  error?: boolean
  errorMessage?: string
}

const VideoField: FC<Props> = ({ setValue, error, errorMessage }) => {
  const theme = useTheme()

  const [videoFileName, setVideoFileName] = useState<string | null>(null)

  const handleSelectVideo = (event: ChangeEvent<HTMLInputElement>) => {
    const video = event.currentTarget.files?.item(0)

    if (!video) {
      setVideoFileName(null)
      return
    }

    setVideoFileName(video.name)
    setValue(event.currentTarget.name, video, { shouldValidate: true })
  }

  return (
    <Box data-testid='VideoField'>
      <Typography
        component='label'
        sx={{
          backgroundColor: 'transparent',
          padding: '10px',
          border: `1px solid ${
            error ? theme.palette.error.main : theme.palette.grey[700]
          }`,
          borderRadius: 1,
          cursor: 'pointer',
          display: 'flex',
          gap: '6px',
          color: error
            ? theme.palette.error.main
            : videoFileName === null
              ? 'grey'
              : 'white',
          ':hover': {
            borderColor: error ? theme.palette.error.main : 'white'
          }
        }}
      >
        <SmartDisplayIcon />

        {videoFileName === null ? 'Video no seleccionado' : videoFileName}

        <input
          type='file'
          name='video'
          role='textbox'
          accept='video/mp4'
          style={{ display: 'none' }}
          onChange={handleSelectVideo}
        />
      </Typography>

      {errorMessage && error && (
        <Typography
          color='error'
          fontSize='0.75rem'
          mt='3px'
          ml='14px'
          data-testid='videoFieldErrorMessage'
        >
          {errorMessage}
        </Typography>
      )}
    </Box>
  )
}

export default VideoField
