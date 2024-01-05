import { ListResponse } from '@/models/responses'
import { ServiceFn } from '@/services/types'

import { SimpleVideoItem } from '@/features/video/models'
import { videoEndpoint } from '@/features/video/services'

export const retrieveTrendingVideosService: ServiceFn<
  ListResponse<SimpleVideoItem>,
  undefined
> = async () => {
  const response =
    await videoEndpoint.get<ListResponse<SimpleVideoItem>>('/trending/')
  return response.data
}
