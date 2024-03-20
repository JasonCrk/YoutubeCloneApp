import type { FC } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import type { PlaylistId, PlaylistName } from '@/features/playlist/types'
import { useUpdatePlaylist } from '@/features/playlist/hooks'

import Button from '@/components/ui/Button'

import { useTheme } from '@mui/material'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

interface Props {
  playlistId: PlaylistId
  defaultValue: PlaylistName
  setOpenForm: (value: boolean) => void
}

const UpdatePlaylistNameField: FC<Props> = ({
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
    getValues,
    formState: { errors, defaultValues }
  } = useForm<{ name: PlaylistName }>({
    defaultValues: {
      name: defaultValue
    },
    resolver: zodResolver(
      z.object({
        name: z
          .string()
          .min(1, 'Name is required')
          .max(150, 'Maximum 150 characters')
      })
    )
  })

  const handleUpdatePlaylistName = (playlistName: PlaylistName) => {
    mutateUpdatePlaylist(
      { playlistId, data: { name: playlistName } },
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

  const handleUpdatePlaylistNameSubmit = handleSubmit(({ name }) =>
    handleUpdatePlaylistName(name)
  )

  return (
    <Box
      gap={0.8}
      display='flex'
      flexDirection='column'
      component='form'
      onSubmit={handleUpdatePlaylistNameSubmit}
    >
      <TextField
        fullWidth
        autoFocus
        {...register('name')}
        variant='standard'
        defaultValue={defaultValues?.name}
        helperText={errors.name?.message}
        error={Boolean(errors.name)}
        InputProps={{ sx: { ...theme.typography.h5, fontWeight: 'bold' } }}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            const playlistName = getValues('name')
            handleUpdatePlaylistName(playlistName)
          }
        }}
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

export default UpdatePlaylistNameField
