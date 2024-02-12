import { HttpResponse, http } from 'msw'

import { BASE_VIDEO_API_URL } from '@/features/video/services'

import {
  createVideoMockResponse,
  retrieveVideoDetailsMockResponse
} from '@/features/video/mocks/api'

export const createVideoMockEndpoint = http.post(
  BASE_VIDEO_API_URL + '/create/',
  () => {
    return HttpResponse.json(createVideoMockResponse)
  }
)

export const retrieveVideoDetailsMockEndpoint = http.get(
  BASE_VIDEO_API_URL + `/:videoId/`,
  () => {
    return HttpResponse.json(retrieveVideoDetailsMockResponse)
  }
)
