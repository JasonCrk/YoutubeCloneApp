import { useQuery } from '@tanstack/react-query'

import { listResponseAdapter } from '@/adapters'

import { retrieveSubscribedChannelsService } from '@/features/subscription/services'
import { simpleChannelAdapter } from '@/features/channel/adapters'

export const useFetchSubscribedChannels = () => {
  const { data: subscribedChannels, ...queryResult } = useQuery({
    queryKey: ['subscribedChannels'],
    queryFn: async () => {
      const channels = await retrieveSubscribedChannelsService()
      return listResponseAdapter(channels, simpleChannelAdapter)
    },
    refetchOnWindowFocus: false
  })

  return { subscribedChannels, ...queryResult }
}
