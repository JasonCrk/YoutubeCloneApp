import { useQuery } from '@tanstack/react-query'

import type { MessageResponse } from '@/models/responses'
import { listResponseAdapter } from '@/adapters'

import type { PlaylistVideoItemAdapter } from '@/features/playlist/models'
import type { PlaylistId } from '@/features/playlist/types'
import { retrievePlaylistVideosService } from '@/features/playlist/services'
import { playlistVideoItemAdapter } from '@/features/playlist/adapters'

export const useFetchPlaylistVideos = (playlistId: PlaylistId) => {
  const { data: playlistVideos, ...queryResult } = useQuery<
    PlaylistVideoItemAdapter[],
    MessageResponse
  >({
    queryKey: ['playlistVideos', playlistId],
    queryFn: async () => {
      const playlistVideos = await retrievePlaylistVideosService(playlistId)
      return listResponseAdapter(playlistVideos, playlistVideoItemAdapter)
    },
    enabled: !!playlistId,
    refetchOnWindowFocus: false
  })

  return { playlistVideos, ...queryResult }
}
