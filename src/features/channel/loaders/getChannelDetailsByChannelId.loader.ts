import { redirect, type LoaderFunction } from 'react-router-dom'

import type { QueryClient } from '@tanstack/react-query'

import { retrieveChannelDetailsByChannelIdService } from '@/features/channel/services'
import { channelDetailsAdapter } from '@/features/channel/adapters'

export const getChannelDetailsByChannelId = (
  queryClient: QueryClient
): LoaderFunction => {
  return async ({ params }) => {
    const { channelId: channelIdParam } = params

    if (!channelIdParam || typeof Number(channelIdParam) !== 'number')
      return redirect('/')

    const channelId = Number(channelIdParam)

    queryClient.prefetchQuery({
      queryKey: ['channelProfile', channelId],
      queryFn: async () => {
        const channel =
          await retrieveChannelDetailsByChannelIdService(channelId)
        return channelDetailsAdapter(channel)
      }
    })

    return { channelId }
  }
}
