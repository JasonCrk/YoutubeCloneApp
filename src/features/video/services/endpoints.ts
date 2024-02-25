import type { ListResponse, MessageResponse } from '@/models/responses'

import type { SimpleVideoItem, VideoDetails } from '@/features/video/models'
import type { VideoId } from '@/features/video/types'
import {
  optionalProtectVideoEndpoint,
  protectedVideoEndpoint,
  videoEndpoint
} from '@/features/video/services'

import type { ChannelId } from '@/features/channel/types'

export const retrieveTrendingVideosService = async (): Promise<
  ListResponse<SimpleVideoItem>
> => {
  const response =
    await videoEndpoint.get<ListResponse<SimpleVideoItem>>('/trending/')
  return response.data
}

export const retrieveSuggestionVideosService = async (
  videoId: VideoId
): Promise<ListResponse<SimpleVideoItem>> => {
  const response = await videoEndpoint.get<ListResponse<SimpleVideoItem>>(
    `/${videoId}/suggestions/`
  )
  return response.data
}

export const retrieveVideoDetailsService = async (
  videoId: VideoId
): Promise<VideoDetails> => {
  const response = await optionalProtectVideoEndpoint.get<VideoDetails>(
    `/${videoId}/`
  )
  return response.data
}

export const retrieveChannelVideosService = async (
  channelId: ChannelId
): Promise<ListResponse<SimpleVideoItem>> => {
  const response = await videoEndpoint.get<ListResponse<SimpleVideoItem>>(
    `/channel/${channelId}`
  )
  return response.data
}

export const createVideoService = async (
  videoData: FormData
): Promise<MessageResponse> => {
  const response = await protectedVideoEndpoint.post('/create/', videoData)
  return response.data
}

export const likeVideoService = async (
  videoId: VideoId
): Promise<MessageResponse> => {
  const response = await protectedVideoEndpoint.post<MessageResponse>(
    `/${videoId}/like/`
  )
  return response.data
}

export const dislikeVideoService = async (
  videoId: VideoId
): Promise<MessageResponse> => {
  const response = await protectedVideoEndpoint.post<MessageResponse>(
    `/${videoId}/dislike/`
  )
  return response.data
}
