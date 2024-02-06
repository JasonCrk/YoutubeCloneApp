import { ListResponse, MessageResponse } from '@/models/responses'

import { ListChannel, CreateChannelInputs } from '@/features/channel/models'
import { ChannelId } from '@/features/channel/types'
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
