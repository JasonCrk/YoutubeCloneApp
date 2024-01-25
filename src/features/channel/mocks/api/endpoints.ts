import { HttpResponse, http } from 'msw'

import {
  createChannelMockResponse,
  ownChannelsMockResponse
} from '@/features/channel/mocks/api'

import { BASE_CHANNEL_API_URL } from '@/features/channel/services'

export const retrieveOwnChannelsMockEndpoint = http.get(
  BASE_CHANNEL_API_URL + '/own/',
  () => HttpResponse.json(ownChannelsMockResponse)
)

export const switchChannelMockEndpoint = http.post(
  BASE_CHANNEL_API_URL + '/:channelId/switch/',
  () => new HttpResponse(null)
)

export const createChannelMockEndpoint = http.post(
  BASE_CHANNEL_API_URL + '/create/',
  () => HttpResponse.json(createChannelMockResponse)
)
