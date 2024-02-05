import { useQuery } from '@tanstack/react-query'

import { listResponseAdapter } from '@/adapters'

import { retrieveTrendingVideosService } from '@/features/video/services'
import { simpleVideoItemAdapter } from '@/features/video/adapters'

export const useFetchTrendingVideos = () => {
  return useQuery({
    queryKey: ['trendingVideos'],
    queryFn: async () => {
      const unadaptedTrendingVideos = await retrieveTrendingVideosService()
      return listResponseAdapter(
        unadaptedTrendingVideos,
        simpleVideoItemAdapter
      )
    },
    refetchOnWindowFocus: false
  })
}
