import { HttpResponse, http } from 'msw'

import { BASE_VIDEO_API_URL } from '@/features/video/services'
import { createVideoMockResponse } from '@/features/video/mocks/api'

export const createVideoMockEndpoint = http.post(
  BASE_VIDEO_API_URL + '/create/',
  () => {
    return HttpResponse.json(createVideoMockResponse)
  }
)
