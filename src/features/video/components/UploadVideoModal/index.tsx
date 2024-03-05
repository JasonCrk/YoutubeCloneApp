import type { FC } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { UploadVideoInputs } from '@/features/video/models'
import {
  useUploadVideoModalContext,
  useCreateVideo
} from '@/features/video/hooks'
import { uploadVideoValidator } from '@/features/video/validations'

import VideoThumbnailField from '@/features/video/components/VideoThumbnailField'
import VideoField from '@/features/video/components/VideoField'

import { Box, Button, Grid, Modal, TextField } from '@mui/material'

const UploadVideoModal: FC = () => {
  const { isOpen, onClose } = useUploadVideoModalContext()

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
    reset
  } = useForm<UploadVideoInputs>({
    resolver: zodResolver(uploadVideoValidator)
  })

  const { mutateCreateVideo, isPending } = useCreateVideo()

  const handleUploadVideoSubmit = handleSubmit(uploadVideoData => {
    const videoData = new FormData()
    videoData.append('title', uploadVideoData.title)
    if (uploadVideoData.description)
      videoData.append('description', uploadVideoData.description)
    videoData.append('thumbnail', uploadVideoData.thumbnail)
    videoData.append('video', uploadVideoData.video)

    mutateCreateVideo(videoData, {
      onSuccess: () => {
        handleCloseModal()
      }
    })
  })

  const handleCloseModal = () => {
    if (!isPending) {
      onClose()
      reset()
    }
  }

  return (
    <Modal open={isOpen} onClose={handleCloseModal}>
      <Box
        data-testid='UploadVideoModal'
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          p: 4,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2
        }}
      >
        <Box
          width='max(250px, 50vw)'
          minWidth='250px'
          maxWidth='800px'
          color='white'
          display='flex'
          flexDirection='column'
          component='form'
          gap={1}
          onSubmit={handleUploadVideoSubmit}
        >
          <Grid container spacing={1} gridTemplateColumns='repeat(2, 1fr)'>
            <Grid item container spacing={1} direction='column' xs={6}>
              <Grid item>
                <TextField
                  {...register('title')}
                  label='Title *'
                  fullWidth
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                />
              </Grid>
              <Grid item>
                <TextField
                  {...register('description')}
                  label='Description'
                  multiline
                  fullWidth
                  rows={8}
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                />
              </Grid>
            </Grid>
            <Grid item container direction='column' xs={6} spacing={1}>
              <Grid item sx={{ width: '100%' }}>
                <VideoThumbnailField
                  setValue={setValue}
                  error={Boolean(errors.thumbnail)}
                  errorMessage={errors.thumbnail?.message}
                />
              </Grid>
              <Grid item>
                <VideoField
                  setValue={setValue}
                  error={Boolean(errors.video)}
                  errorMessage={errors.video?.message}
                />
              </Grid>
            </Grid>
          </Grid>

          <Button
            sx={{ alignSelf: 'end' }}
            variant='contained'
            type='submit'
            disabled={isPending}
            role='button'
          >
            upload
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default UploadVideoModal
