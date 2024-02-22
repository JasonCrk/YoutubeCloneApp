import type { ListResponse } from '@/models/responses'

import type { PlaylistItem, SimplePlaylist } from '@/features/playlist/models'
import type { ChannelId } from '@/features/channel/types'
import {
  optionalAuthPlaylistEndpoint,
  protectedPlaylistEndpoint
} from '@/features/playlist/services'

export const retrieveOwnPlaylistsService = async (): Promise<
  ListResponse<SimplePlaylist>
> => {
  const response =
    await protectedPlaylistEndpoint.get<ListResponse<SimplePlaylist>>('/own/')
  return response.data
}

export const retrieveChannelPlaylistsService = async (
  channelId: ChannelId
): Promise<ListResponse<PlaylistItem>> => {
  const response = await optionalAuthPlaylistEndpoint.get<
    ListResponse<PlaylistItem>
  >(`/channel/${channelId}`)
  return response.data
}
