import { redirect, type LoaderFunction } from 'react-router-dom'

import type { QueryClient } from '@tanstack/react-query'

import { retrieveChannelDetailsByHandleService } from '@/features/channel/services'
import { channelDetailsAdapter } from '@/features/channel/adapters'

export const getChannelDetailsByHandle = (
  queryClient: QueryClient
): LoaderFunction => {
  return async ({ params }) => {
    const { handle } = params

    if (!handle || !handle.startsWith('@')) return redirect('/')

    const handleWithoutAt = handle.substring(1)

    queryClient.prefetchQuery({
      queryKey: ['channelProfile', handleWithoutAt],
      queryFn: async () => {
        const channel =
          await retrieveChannelDetailsByHandleService(handleWithoutAt)
        return channelDetailsAdapter(channel)
      }
    })

    return { channelHandle: handleWithoutAt }
  }
}
