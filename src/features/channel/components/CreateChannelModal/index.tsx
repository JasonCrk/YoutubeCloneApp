import type { FC } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { CreateChannelInputs } from '@/features/channel/models'
import {
  useCreateChannel,
  useCreateChannelModalContext
} from '@/features/channel/hooks'
import { createChannelValidator } from '@/features/channel/validators'

import { Box, Button, Modal, TextField, Typography } from '@mui/material'

const CreateChannelModal: FC = () => {
  const { isOpen, onClose } = useCreateChannelModalContext()

  const queryClient = useQueryClient()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<CreateChannelInputs>({
    resolver: zodResolver(createChannelValidator)
  })

  const { mutateCreateChannel, isPending } = useCreateChannel()

  const handleCreateChannelSubmit = handleSubmit(channelData => {
    mutateCreateChannel(channelData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['ownChannels'] })
        handleCloseModal()
      }
    })
  })

  const handleCloseModal = () => {
    onClose()
    reset({
      name: ''
    })
  }

  return (
    <Modal open={isOpen} onClose={handleCloseModal}>
      <Box
        data-testid='CreateChannelModal'
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
          width='400px'
          color='white'
          component='form'
          display='flex'
          flexDirection='column'
          rowGap={1}
          onSubmit={handleCreateChannelSubmit}
        >
          <Typography component='h3' variant='h6'>
            New Channel
          </Typography>

          <TextField
            label='Name'
            {...register('name')}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />

          <Button type='submit' disabled={isPending} sx={{ alignSelf: 'end' }}>
            create channel
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default CreateChannelModal
