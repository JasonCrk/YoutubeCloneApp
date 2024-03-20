import type { FC } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { Visibility } from '@/models/types'

import type { PlaylistId } from '@/features/playlist/types'
import { useUpdatePlaylist } from '@/features/playlist/hooks'

import SelectVisibilityField from '@/components/form/SelectVisibilityField'

import { SelectChangeEvent } from '@mui/material'

interface Props {
  playlistId: PlaylistId
  defaultValue: Visibility
}

const UpdatePlaylistVisibilityField: FC<Props> = ({
  defaultValue,
  playlistId
}) => {
  const { mutateUpdatePlaylist } = useUpdatePlaylist()

  const queryClient = useQueryClient()

  const handleChangeUpdateVisibility = (event: SelectChangeEvent<unknown>) => {
    mutateUpdatePlaylist(
      {
        playlistId,
        data: { visibility: event.target.value as Visibility }
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['playlistDetails', playlistId]
          })
        }
      }
    )
  }

  return (
    <SelectVisibilityField
      disableLabel
      disableUnderline
      defaultValue={defaultValue}
      value={defaultValue}
      name='visibility'
      onChange={handleChangeUpdateVisibility}
    />
  )
}

export default UpdatePlaylistVisibilityField
