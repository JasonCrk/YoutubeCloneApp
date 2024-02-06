import type { FC } from 'react'

import { useMutation } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { UploadVideoInputs } from '@/features/video/models'

import { createVideoService } from '@/features/video/services'

import { useUploadVideoModalContext } from '@/features/video/hooks'

import { uploadVideoValidator } from '@/features/video/validations'

import VideoThumbnailField from '@/features/video/components/VideoThumbnailField'
import VideoField from '@/features/video/components/VideoField'

import { Box, Button, Modal, Stack, TextField } from '@mui/material'

import toast from 'react-hot-toast'

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

  const { mutate: callCreateVideoService, isPending } = useMutation({
    mutationFn: createVideoService,
    onSuccess: ({ message }) => {
      toast.success(message, {
        duration: 4000
      })
      handleCloseModal()
    }
  })

  const handleUploadVideoSubmit = handleSubmit(uploadVideoData => {
    const videoData = new FormData()
    videoData.append('title', uploadVideoData.title)
    if (uploadVideoData.description)
      videoData.append('description', uploadVideoData.description)
    videoData.append('thumbnail', uploadVideoData.thumbnail)
    videoData.append('video', uploadVideoData.video)

    callCreateVideoService(videoData)
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
          <div style={{ display: 'flex', width: '100%', gap: 8 }}>
            <Stack spacing={1.2} width='55%'>
              <TextField
                {...register('title')}
                label='Title *'
                fullWidth
                error={Boolean(errors.title)}
                helperText={errors.title?.message}
              />

              <TextField
                {...register('description')}
                label='Description'
                multiline
                fullWidth
                rows={6}
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
              />
            </Stack>

            <Stack spacing={1.2} width='45%'>
              <VideoThumbnailField
                setValue={setValue}
                error={Boolean(errors.thumbnail)}
                errorMessage={errors.thumbnail?.message}
              />
              <VideoField
                setValue={setValue}
                error={Boolean(errors.video)}
                errorMessage={errors.video?.message}
              />
            </Stack>
          </div>

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
