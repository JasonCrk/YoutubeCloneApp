import { type ChangeEvent, type FC, useState } from 'react'

import type { UseFormSetValue } from 'react-hook-form'

import ThumbnailImage from '@/components/ui/ThumbnailImage'

import type { VideoThumbnail } from '@/features/video/types'

import {
  VideoThumbnailFieldContainer,
  VideoThumbnailFieldError,
  VideoThumbnailFieldLabel
} from '@/features/video/components/VideoThumbnailField/ui'

import { Box, IconButton } from '@mui/material'

import FileUploadIcon from '@mui/icons-material/FileUpload'
import ClearIcon from '@mui/icons-material/Clear'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>
  error?: boolean
  errorMessage?: string
}

const VideoThumbnailField: FC<Props> = ({ setValue, error, errorMessage }) => {
  const [videoThumbnailUrl, setVideoThumbnailUrl] =
    useState<VideoThumbnail | null>(null)

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
      <VideoThumbnailFieldContainer error={error}>
        {videoThumbnailUrl !== null ? (
          <>
            <ThumbnailImage
              thumbnailUrl={videoThumbnailUrl}
              alt='preview video thumbnail'
            />

            <IconButton
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
              color='error'
              onClick={handleRemoveImage}
            >
              <ClearIcon />
            </IconButton>
          </>
        ) : (
          <VideoThumbnailFieldLabel htmlFor='thumbnail'>
            <FileUploadIcon />
          </VideoThumbnailFieldLabel>
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
      </VideoThumbnailFieldContainer>

      {errorMessage && error && (
        <VideoThumbnailFieldError data-testid='errorMessage'>
          {errorMessage}
        </VideoThumbnailFieldError>
      )}
    </Box>
  )
}

export default VideoThumbnailField
