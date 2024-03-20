import { useMutation } from '@tanstack/react-query'

import toast from 'react-hot-toast'

import { deletePlaylistService } from '@/features/playlist/services'

export const useDeletePlaylist = () => {
  const {
    mutate: mutateDeletePlaylist,
    mutateAsync: mutateAsyncDeletePlaylist,
    ...mutationResult
  } = useMutation({
    mutationFn: deletePlaylistService,
    onError: ({ message }) => {
      toast.error(message, {
        duration: 1500,
        position: 'bottom-left'
      })
    }
  })

  return {
    mutateDeletePlaylist,
    mutateAsyncDeletePlaylist,
    ...mutationResult
  }
}
