import { useQuery } from '@tanstack/react-query'

import type { MessageResponse } from '@/models/responses'

import type { ChannelDetailsAdapter } from '@/features/channel/models'
import type { ChannelId } from '@/features/channel/types'
import { retrieveChannelDetailsByChannelIdService } from '@/features/channel/services'
import { channelDetailsAdapter } from '@/features/channel/adapters'

export const useFetchChannelDetailsByChannelId = (channelId: ChannelId) => {
  const { data: channelDetails, ...queryResult } = useQuery<
    ChannelDetailsAdapter,
    MessageResponse
  >({
    queryKey: ['channelProfile', channelId],
    queryFn: async () => {
      const channel = await retrieveChannelDetailsByChannelIdService(channelId)
      return channelDetailsAdapter(channel)
    }
  })

  return { channelDetails, ...queryResult }
}
