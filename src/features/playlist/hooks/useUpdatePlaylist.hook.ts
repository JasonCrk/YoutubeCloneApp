import { useMutation } from '@tanstack/react-query'

import toast from 'react-hot-toast'

import type { MessageResponse } from '@/models/responses'

import type { UpdatePlaylistInputs } from '@/features/playlist/models'
import type { PlaylistId } from '@/features/playlist/types'
import { updatePlaylistService } from '@/features/playlist/services'

export const useUpdatePlaylist = () => {
  const {
    mutate: mutateUpdatePlaylist,
    mutateAsync: mutateAsyncUpdatePlaylist,
    ...mutationResult
  } = useMutation<
    MessageResponse,
    MessageResponse,
    { playlistId: PlaylistId; data: UpdatePlaylistInputs }
  >({
    mutationFn: updatePlaylistService,
    onError: ({ message }) => {
      toast.error(message, {
        duration: 1500,
        position: 'bottom-left'
      })
    }
  })

  return { mutateUpdatePlaylist, mutateAsyncUpdatePlaylist, ...mutationResult }
}
