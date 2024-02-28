import type { FC } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Visibility } from '@/models/types'

import type {
  CreatePlaylistInputs,
  SimplePlaylistAdapter
} from '@/features/playlist/models'
import { useCreatePlaylist } from '@/features/playlist/hooks'
import { createPlaylistValidator } from '@/features/playlist/validators'

import SelectVisibilityField from '@/components/form/SelectVisibilityField'
import Button from '@/components/ui/Button'

import { Box, TextField, useTheme } from '@mui/material'

interface Props {
  onSuccessfulCreatePlaylist?: (playlist: SimplePlaylistAdapter) => void
}

const CreatePlaylistForm: FC<Props> = ({ onSuccessfulCreatePlaylist }) => {
  const { mutateCreatePlaylist } = useCreatePlaylist()

  const theme = useTheme()

  const {
    register,
    formState: { errors, defaultValues },
    handleSubmit
  } = useForm<CreatePlaylistInputs>({
    resolver: zodResolver(createPlaylistValidator),
    defaultValues: {
      visibility: Visibility.PRIVATE
    }
  })

  const handleCreatePlaylist = handleSubmit(async playlistData => {
    mutateCreatePlaylist(playlistData, {
      onSuccess: playlistCreated => {
        if (onSuccessfulCreatePlaylist)
          onSuccessfulCreatePlaylist(playlistCreated)
      }
    })
  })

  return (
    <Box
      component='form'
      display='flex'
      flexDirection='column'
      px={2.5}
      pb={1}
      gap={1}
      onSubmit={handleCreatePlaylist}
    >
      <TextField
        label='Name'
        placeholder='Enter playlist title...'
        variant='standard'
        autoFocus
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <SelectVisibilityField
        name='visibility'
        register={register}
        error={!!errors.visibility}
        defaultValue={defaultValues?.visibility}
        errorMessage={errors.visibility?.message}
      />

      <Button
        type='submit'
        bgcolor={theme.palette.primary.main}
        color={theme.palette.primary.main}
        sx={{ alignSelf: 'end' }}
      >
        Create
      </Button>
    </Box>
  )
}

export default CreatePlaylistForm
