import { useQuery } from '@tanstack/react-query'

import { listResponseAdapter } from '@/adapters'

import { retrieveOwnChannelsService } from '@/features/channel/services'
import { listChannelAdapter } from '@/features/channel/adapters'

export const useFetchOwnChannels = () => {
  const { data: channels, ...queryResult } = useQuery({
    queryKey: ['ownChannels'],
    queryFn: async () => {
      const channelList = await retrieveOwnChannelsService()
      return listResponseAdapter(channelList, listChannelAdapter)
    },
    refetchOnWindowFocus: false
  })

  return { channels, ...queryResult }
}
