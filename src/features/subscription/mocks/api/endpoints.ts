import { HttpResponse, http } from 'msw'

import { BASE_CHANNEL_API_URL } from '@/features/channel/services'

import { subscribedChannelsMockResponse } from '@/features/subscription/mocks/api'

export const retrieveSubscribedChannelsMockEndpoint = http.get(
  BASE_CHANNEL_API_URL + '/subscribed',
  () => {
    return HttpResponse.json(subscribedChannelsMockResponse)
  }
)
