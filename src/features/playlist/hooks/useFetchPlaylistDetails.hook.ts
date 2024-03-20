import { useQuery } from '@tanstack/react-query'

import type { MessageResponse } from '@/models/responses'

import type { PlaylistDetailsAdapter } from '@/features/playlist/models'
import type { PlaylistId } from '@/features/playlist/types'
import { retrievePlaylistDetailsService } from '@/features/playlist/services'
import { playlistDetailsAdapter } from '@/features/playlist/adapters'

export const useFetchPlaylistDetails = (playlistId: PlaylistId) => {
  const { data: playlist, ...queryResult } = useQuery<
    PlaylistDetailsAdapter,
    MessageResponse
  >({
    queryKey: ['playlistDetails', playlistId],
    queryFn: async () => {
      const playlist = await retrievePlaylistDetailsService(playlistId)
      return playlistDetailsAdapter(playlist)
    },
    refetchOnWindowFocus: false
  })

  return { playlist, ...queryResult }
}
