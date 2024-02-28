import { useMutation } from '@tanstack/react-query'

import { createPlaylistService } from '@/features/playlist/services'

export const useCreatePlaylist = () => {
  const {
    mutate: mutateCreatePlaylist,
    mutateAsync: mutateAsyncCreatePlaylist,
    ...mutationResult
  } = useMutation({
    mutationFn: createPlaylistService
  })

  return { mutateCreatePlaylist, mutateAsyncCreatePlaylist, ...mutationResult }
}
