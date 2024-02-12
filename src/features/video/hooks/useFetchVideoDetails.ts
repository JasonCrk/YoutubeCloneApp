import { useQuery } from '@tanstack/react-query'

import type { MessageResponse } from '@/models/responses'

import type { VideoId } from '@/features/video/types'
import type { VideoDetailsAdapter } from '@/features/video/models'
import { retrieveVideoDetailsService } from '@/features/video/services'
import { videoDetailsAdapter } from '@/features/video/adapters'

export const useFetchVideoDetails = (videoId: VideoId) => {
  const {
    data: video,
    error,
    isError,
    isSuccess,
    isLoading
  } = useQuery<
    VideoDetailsAdapter,
    MessageResponse | null,
    VideoDetailsAdapter
  >({
    queryKey: ['watchVideo', videoId],
    queryFn: async () => {
      const videoDetails = await retrieveVideoDetailsService(videoId)
      return videoDetailsAdapter(videoDetails)
    },
    refetchOnWindowFocus: false
  })

  return { video, error, isError, isSuccess, isLoading }
}
