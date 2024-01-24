import { ListResponse } from '@/models/responses'

import { SimplePlaylist } from '@/features/playlist/models'
import { playlistEndpoint } from '@/features/playlist/services'

export const retrieveOwnPlaylistsService = async (): Promise<
  ListResponse<SimplePlaylist>
> => {
  const response =
    await playlistEndpoint.get<ListResponse<SimplePlaylist>>('/own/')
  return response.data
}
