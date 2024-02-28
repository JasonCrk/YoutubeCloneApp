import { useQuery } from '@tanstack/react-query'

import type { MessageResponse } from '@/models/responses'
import { listResponseAdapter } from '@/adapters'

import type { PlaylistItemToSaveVideoAdapter } from '@/features/playlist/models'
import type { VideoId } from '@/features/video/types'
import { retrieveOwnPlaylistsToSaveVideoService } from '@/features/playlist/services'
import { playlistItemToSaveVideoAdapter } from '@/features/playlist/adapters'

export const useFetchOwnPlaylistsToSaveVideo = (videoId: VideoId) => {
  const { data: playlistsToSaveVideo, ...queryResult } = useQuery<
    PlaylistItemToSaveVideoAdapter[],
    MessageResponse
  >({
    queryKey: ['ownPlaylistsToSaveVideo', videoId],
    queryFn: async () => {
      const playlists = await retrieveOwnPlaylistsToSaveVideoService(videoId)
      return listResponseAdapter(playlists, playlistItemToSaveVideoAdapter)
    },
    enabled: !!videoId,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })

  return { playlistsToSaveVideo, ...queryResult }
}
