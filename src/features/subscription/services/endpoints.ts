import type { ListResponse, MessageResponse } from '@/models/responses'

import type { SimpleChannel } from '@/features/channel/models'
import type { ChannelId } from '@/features/channel/types'
import { protectedChannelEndpoint } from '@/features/channel/services'

export const retrieveSubscribedChannelsService = async (): Promise<
  ListResponse<SimpleChannel>
> => {
  const response =
    await protectedChannelEndpoint.get<ListResponse<SimpleChannel>>(
      '/subscribed/'
    )
  return response.data
}

export const subscribeToChannelService = async (
  channelId: ChannelId
): Promise<MessageResponse> => {
  const response = await protectedChannelEndpoint.post<MessageResponse>(
    `/${channelId}/subscribe/`
  )
  return response.data
}
