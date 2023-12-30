import { ListResponse } from '@/models/responses'
import { ServiceFn } from '@/services/types'

import { SimpleChannel } from '@/features/channel/models'
import { protectedChannelEndpoint } from '@/features/channel/services'

export const retrieveSubscribedChannelsService: ServiceFn<
  ListResponse<SimpleChannel>,
  undefined
> = async () => {
  const response =
    await protectedChannelEndpoint.get<ListResponse<SimpleChannel>>(
      '/subscribed/'
    )
  return response.data
}
