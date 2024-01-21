import { ListResponse } from '@/models/responses'
import { ServiceFn } from '@/services/types'

import { ChannelId, ListChannel } from '@/features/channel/models'
import { protectedChannelEndpoint } from '@/features/channel/services'

export const retrieveOwnChannelsService: ServiceFn<
  ListResponse<ListChannel>,
  undefined
> = async () => {
  const response = await protectedChannelEndpoint.get('/own/')
  return response.data
}

export const switchChannelService: ServiceFn<
  void,
  ChannelId
> = async channelId => {
  await protectedChannelEndpoint.post(`/${channelId}/switch/`, null)
}
