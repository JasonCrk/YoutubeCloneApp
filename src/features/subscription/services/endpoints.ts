import { ListResponse } from '@/models/responses'

import { SimpleChannel } from '@/features/channel/models'
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
