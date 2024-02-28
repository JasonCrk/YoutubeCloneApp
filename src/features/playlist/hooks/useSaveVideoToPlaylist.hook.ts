import { useMutation } from '@tanstack/react-query'

import { saveVideoToPlaylistService } from '@/features/playlist/services'

import toast from 'react-hot-toast'

export const useSaveVideoToPlaylist = () => {
  const {
    mutate: mutateSaveVideoToPlaylist,
    mutateAsync: mutateAsyncSaveVideoToPlaylist,
    ...mutationResult
  } = useMutation({
    mutationFn: saveVideoToPlaylistService,
    onSuccess: ({ message }) => {
      toast(message, {
        duration: 1500,
        position: 'bottom-left'
      })
    }
  })

  return {
    mutateAsyncSaveVideoToPlaylist,
    mutateSaveVideoToPlaylist,
    ...mutationResult
  }
}
