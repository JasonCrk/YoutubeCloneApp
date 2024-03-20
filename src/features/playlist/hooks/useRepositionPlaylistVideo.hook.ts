import { useMutation } from '@tanstack/react-query'

import toast from 'react-hot-toast'

import type { MessageResponse } from '@/models/responses'

import type {
  PlaylistId,
  PlaylistVideoId,
  PlaylistVideoPosition
} from '@/features/playlist/types'
import { repositionPlaylistVideoService } from '@/features/playlist/services'

export const useRepositionPlaylistVideo = () => {
  const {
    mutate: mutateRepositionPlaylistVideo,
    mutateAsync: mutateAsyncRepositionPlaylistVideo,
    ...mutationResult
  } = useMutation<
    void,
    MessageResponse,
    {
      playlistId: PlaylistId
      playlistVideoId: PlaylistVideoId
      newPlaylistVideoPosition: PlaylistVideoPosition
    }
  >({
    mutationFn: repositionPlaylistVideoService,
    onError: ({ message }) => {
      toast.error(message, {
        duration: 1500,
        position: 'bottom-left'
      })
    }
  })

  return {
    mutateRepositionPlaylistVideo,
    mutateAsyncRepositionPlaylistVideo,
    ...mutationResult
  }
}
