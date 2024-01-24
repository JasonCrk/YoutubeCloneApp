import { ListResponse } from '@/models/responses'

import { ChannelId, ListChannel } from '@/features/channel/models'
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
