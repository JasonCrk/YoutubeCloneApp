import { useQuery } from '@tanstack/react-query'

import type { MessageResponse } from '@/models/responses'

import type { ChannelHandle } from '@/features/channel/types'
import type { ChannelDetailsAdapter } from '@/features/channel/models'
import { retrieveChannelDetailsByHandleService } from '@/features/channel/services'
import { channelDetailsAdapter } from '@/features/channel/adapters'

export const useFetchChannelDetailsByHandle = (handle: ChannelHandle) => {
  const { data: channelDetails, ...queryResult } = useQuery<
    ChannelDetailsAdapter,
    MessageResponse
  >({
    queryKey: ['channelProfile', handle],
    queryFn: async () => {
      const channel = await retrieveChannelDetailsByHandleService(handle)
      return channelDetailsAdapter(channel)
    },
    enabled: !!handle,
    refetchOnWindowFocus: false
  })

  return { channelDetails, ...queryResult }
}
