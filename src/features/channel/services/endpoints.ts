import type { ListResponse, MessageResponse } from '@/models/responses'

import type {
  ListChannel,
  CreateChannelInputs,
  ChannelDetails
} from '@/features/channel/models'
import type { ChannelHandle, ChannelId } from '@/features/channel/types'
import {
  optionalAuthChannelEndpoint,
  protectedChannelEndpoint
} from '@/features/channel/services'

export const retrieveOwnChannelsService = async (): Promise<
  ListResponse<ListChannel>
> => {
  const response = await protectedChannelEndpoint.get('/own/')
  return response.data
}

export const retrieveChannelDetailsByHandleService = async (
  handle: ChannelHandle
): Promise<ChannelDetails> => {
  const response = await optionalAuthChannelEndpoint.get('/by-handle/' + handle)
  return response.data
}

export const retrieveChannelDetailsByChannelIdService = async (
  channelId: ChannelId
): Promise<ChannelDetails> => {
  const response = await optionalAuthChannelEndpoint.get('/by-id/' + channelId)
  return response.data
}

export const switchChannelService = async (
  channelId: ChannelId
): Promise<void> => {
  await protectedChannelEndpoint.post(`/${channelId}/switch/`, null)
}

export const createChannelService = async (
  createChannelData: CreateChannelInputs
): Promise<MessageResponse> => {
  const response = await protectedChannelEndpoint.post<MessageResponse>(
    '/create/',
    createChannelData
  )
  return response.data
}

export const updateChannelService = async (
  channelData: FormData
): Promise<MessageResponse> => {
  const response = await protectedChannelEndpoint.patch<MessageResponse>(
    '/edit/',
    channelData
  )
  return response.data
}
