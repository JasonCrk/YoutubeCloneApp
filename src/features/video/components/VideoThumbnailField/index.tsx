import { CSSProperties, ChangeEvent, FC, useState } from 'react'

import { UseFormSetValue } from 'react-hook-form'

import { Box, IconButton, Typography, useTheme } from '@mui/material'

import FileUploadIcon from '@mui/icons-material/FileUpload'
import ClearIcon from '@mui/icons-material/Clear'

const centerStyles: CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>
  error?: boolean
  errorMessage?: string
}

const VideoThumbnailField: FC<Props> = ({ setValue, error, errorMessage }) => {
  const [videoThumbnailUrl, setVideoThumbnailUrl] = useState<string | null>(
    null
  )

  const theme = useTheme()

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const imageSelected = event.currentTarget.files?.item(0)

    if (!imageSelected) {
      setVideoThumbnailUrl(null)
      return
    }

    setVideoThumbnailUrl(URL.createObjectURL(imageSelected))
    setValue(event.currentTarget.name, imageSelected, { shouldValidate: true })
  }

  const handleRemoveImage = () => {
    setVideoThumbnailUrl(null)
    setValue('thumbnail', null, { shouldValidate: true })
  }

  return (
    <Box data-testid='VideoThumbnailField'>
      <Box
        sx={{
          backgroundColor: 'grey.800',
          borderRadius: '10px',
          position: 'relative',
          height: '180px',
          width: '100%',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: error
            ? theme.palette.error.main
            : theme.palette.grey[700]
        }}
      >
        {videoThumbnailUrl !== null ? (
          <>
            <img
              src={videoThumbnailUrl}
              alt='preview video thumbnail'
              role='img'
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '10px',
                aspectRatio: 16 / 9,
                objectFit: 'cover'
              }}
            />

            <IconButton
              size='small'
              style={centerStyles}
              color='error'
              onClick={handleRemoveImage}
            >
              <ClearIcon fontSize='small' />
            </IconButton>
          </>
        ) : (
          <label
            htmlFor='thumbnail'
            style={{
              ...centerStyles,
              background: error
                ? theme.palette.error.main
                : theme.palette.grey[900],
              opacity: '60%',
              padding: '5px',
              borderRadius: '100%',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <FileUploadIcon />
          </label>
        )}

        <input
          id='thumbnail'
          type='file'
          name='thumbnail'
          style={{ display: 'none' }}
          role='textbox'
          accept='image/png, image/jpeg, image/webp'
          onChange={handleChangeImage}
        />
      </Box>

      {errorMessage && error && (
        <Typography color='error' fontSize='0.75rem' mt='3px' ml='14px'>
          {errorMessage}
        </Typography>
      )}
    </Box>
  )
}

export default VideoThumbnailField
