import { ListResponse, MessageResponse } from '@/models/responses'

import { SimpleVideoItem } from '@/features/video/models'
import {
  protectedVideoEndpoint,
  videoEndpoint
} from '@/features/video/services'

export const retrieveTrendingVideosService = async (): Promise<
  ListResponse<SimpleVideoItem>
> => {
  const response =
    await videoEndpoint.get<ListResponse<SimpleVideoItem>>('/trending/')
  return response.data
}

export const createVideoService = async (
  videoData: FormData
): Promise<MessageResponse> => {
  const response = await protectedVideoEndpoint.post('/create/', videoData)
  return response.data
}
