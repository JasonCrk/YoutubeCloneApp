import { useQuery } from '@tanstack/react-query'

import type { MessageResponse } from '@/models/responses'
import { listResponseAdapter } from '@/adapters'

import type { PlaylistItemAdapter } from '@/features/playlist/models'
import type { ChannelId } from '@/features/channel/types'
import { retrieveChannelPlaylistsService } from '@/features/playlist/services'
import { playlistItemAdapter } from '@/features/playlist/adapters'

export const useFetchChannelPlaylists = (channelId: ChannelId) => {
  const { data: channelPlaylists, ...queryResult } = useQuery<
    PlaylistItemAdapter[],
    MessageResponse
  >({
    queryKey: ['channelPlaylists', channelId],
    queryFn: async () => {
      const playlists = await retrieveChannelPlaylistsService(channelId)
      return listResponseAdapter(playlists, playlistItemAdapter)
    },
    enabled: !!channelId,
    refetchOnWindowFocus: false
  })

  return { channelPlaylists, ...queryResult }
}
