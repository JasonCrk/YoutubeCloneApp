import type { FC } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import Button from '@/components/ui/Button'

import type { PlaylistDescription, PlaylistId } from '@/features/playlist/types'
import { useUpdatePlaylist } from '@/features/playlist/hooks'

import { useTheme, Box, TextField } from '@mui/material'

interface Props {
  playlistId: PlaylistId
  defaultValue: PlaylistDescription
  setOpenForm: (value: boolean) => void
}

const UpdatePlaylistDescriptionField: FC<Props> = ({
  defaultValue,
  playlistId,
  setOpenForm
}) => {
  const theme = useTheme()
  const queryClient = useQueryClient()

  const { mutateUpdatePlaylist } = useUpdatePlaylist()

  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues }
  } = useForm<{ description: PlaylistDescription }>({
    defaultValues: {
      description: defaultValue ?? ''
    },
    resolver: zodResolver(
      z.object({
        description: z
          .string()
          .max(5000, 'Maximum 5000 characters')
          .nullable()
          .transform(value => (value === '' ? null : value))
      })
    )
  })

  const handleUpdatePlaylistDescriptionSubmit = handleSubmit(
    ({ description }) => {
      mutateUpdatePlaylist(
        { playlistId, data: { description } },
        {
          onSuccess: () => {
            setOpenForm(false)
            queryClient.invalidateQueries({
              queryKey: ['playlistDetails', playlistId]
            })
          }
        }
      )
    }
  )

  return (
    <Box
      gap={0.8}
      mt={1}
      display='flex'
      flexDirection='column'
      component='form'
      onSubmit={handleUpdatePlaylistDescriptionSubmit}
    >
      <TextField
        fullWidth
        autoFocus
        multiline
        maxRows={4}
        variant='standard'
        placeholder='Description'
        {...register('description')}
        defaultValue={defaultValues?.description}
        helperText={errors.description?.message}
        error={Boolean(errors.description)}
        InputProps={{ sx: theme.typography.body2 }}
      />

      <Box alignSelf='end' display='flex' gap={0.5} alignItems='center'>
        <Button type='button' onClick={() => setOpenForm(false)}>
          Cancel
        </Button>

        <Button type='submit'>Save</Button>
      </Box>
    </Box>
  )
}

export default UpdatePlaylistDescriptionField
