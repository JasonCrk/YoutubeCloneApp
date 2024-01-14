import { ListResponse, MessageResponse } from '@/models/responses'
import { ServiceFn } from '@/services/types'

import { SimpleVideoItem } from '@/features/video/models'
import {
  protectedVideoEndpoint,
  videoEndpoint
} from '@/features/video/services'

export const retrieveTrendingVideosService: ServiceFn<
  ListResponse<SimpleVideoItem>,
  undefined
> = async () => {
  const response =
    await videoEndpoint.get<ListResponse<SimpleVideoItem>>('/trending/')
  return response.data
}

export const createVideoService: ServiceFn<
  MessageResponse,
  FormData
> = async videoData => {
  const response = await protectedVideoEndpoint.post('/create/', videoData)
  return response.data
}
