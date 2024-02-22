import { useQuery } from '@tanstack/react-query'

import type { MessageResponse } from '@/models/responses'
import { listResponseAdapter } from '@/adapters'

import type { SimpleVideoItemAdapter } from '@/features/video/models'
import type { ChannelId } from '@/features/channel/types'
import { retrieveChannelVideosService } from '@/features/video/services'
import { simpleVideoItemAdapter } from '@/features/video/adapters'

export const useFetchChannelVideos = (channelId: ChannelId) => {
  const { data: channelVideos, ...queryResult } = useQuery<
    SimpleVideoItemAdapter[],
    MessageResponse
  >({
    queryKey: ['channelVideos', channelId],
    queryFn: async () => {
      const videos = await retrieveChannelVideosService(channelId)
      return listResponseAdapter(videos, simpleVideoItemAdapter)
    },
    enabled: !!channelId,
    refetchOnWindowFocus: false
  })

  return { channelVideos, ...queryResult }
}
