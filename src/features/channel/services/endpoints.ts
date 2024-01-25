import { ListResponse, MessageResponse } from '@/models/responses'

import {
  ChannelId,
  ListChannel,
  CreateChannelInputs
} from '@/features/channel/models'
import { protectedChannelEndpoint } from '@/features/channel/services'

export const retrieveOwnChannelsService = async (): Promise<
  ListResponse<ListChannel>
> => {
  const response = await protectedChannelEndpoint.get('/own/')
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
