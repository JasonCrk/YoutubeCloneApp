import { HttpResponse, http } from 'msw'

import { BASE_PLAYLIST_API_URL } from '@/features/playlist/services'
import { simplePlaylistsMockResponse } from '@/features/playlist/mock/api'

export const retrieveOwnPlaylistsMockService = http.get(
  BASE_PLAYLIST_API_URL + '/own/',
  () => {
    return HttpResponse.json(simplePlaylistsMockResponse)
  }
)
