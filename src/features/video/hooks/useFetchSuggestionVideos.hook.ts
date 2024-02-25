import { useQuery } from '@tanstack/react-query'

import type { MessageResponse } from '@/models/responses'
import { listResponseAdapter } from '@/adapters'

import type { SimpleVideoItemAdapter } from '@/features/video/models'
import type { VideoId } from '@/features/video/types'
import { retrieveSuggestionVideosService } from '@/features/video/services'
import { simpleVideoItemAdapter } from '@/features/video/adapters'

export const useFetchSuggestionVideos = (videoId: VideoId) => {
  const { data: suggestionVideos, ...queryResult } = useQuery<
    SimpleVideoItemAdapter[],
    MessageResponse
  >({
    queryKey: ['suggestionVideos', videoId],
    queryFn: async () => {
      const videos = await retrieveSuggestionVideosService(videoId)
      return listResponseAdapter(videos, simpleVideoItemAdapter)
    },
    enabled: !!videoId,
    refetchOnWindowFocus: false
  })

  return { suggestionVideos, ...queryResult }
}
