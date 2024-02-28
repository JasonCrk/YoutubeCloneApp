import { useMutation } from '@tanstack/react-query'

import toast from 'react-hot-toast'

import { removeVideoFromPlaylistService } from '@/features/playlist/services'

export const useRemoveVideoFromPlaylist = () => {
  const {
    mutate: mutateRemoveVideoFromPlaylist,
    mutateAsync: mutateAsyncRemoveVideoFromPlaylist,
    ...mutationResult
  } = useMutation({
    mutationFn: removeVideoFromPlaylistService,
    onSuccess: ({ message }) => {
      toast(message, {
        duration: 1500,
        position: 'bottom-left'
      })
    }
  })

  return {
    mutateAsyncRemoveVideoFromPlaylist,
    mutateRemoveVideoFromPlaylist,
    ...mutationResult
  }
}
