import { ListResponse } from '@/models/responses'
import { ServiceFn } from '@/services/types'

import { SimplePlaylist } from '@/features/playlist/models'
import { playlistEndpoint } from '@/features/playlist/services'

export const retrieveOwnPlaylistsService: ServiceFn<
  ListResponse<SimplePlaylist>,
  undefined
> = async () => {
  const response =
    await playlistEndpoint.get<ListResponse<SimplePlaylist>>('/own/')
  return response.data
}
