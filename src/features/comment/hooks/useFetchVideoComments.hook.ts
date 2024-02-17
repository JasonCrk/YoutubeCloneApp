import { useQuery } from '@tanstack/react-query'

import { listResponseAdapter } from '@/adapters'

import type { VideoCommentsSortBy } from '@/features/comment/types'
import { retrieveVideoCommentsService } from '@/features/comment/services'
import { commentItemAdapter } from '@/features/comment/adapters'

import type { VideoId } from '@/features/video/types'

export const useFetchVideoComments = (
  videoId: VideoId,
  sortBy?: VideoCommentsSortBy
) => {
  const { data: videoComments, ...queryResult } = useQuery({
    queryKey: ['videoComments', videoId, sortBy],
    queryFn: async () => {
      const comments = await retrieveVideoCommentsService({
        videoId,
        params: sortBy ? { sortBy } : undefined
      })
      return listResponseAdapter(comments, commentItemAdapter)
    },
    refetchOnWindowFocus: false
  })

  return { videoComments, ...queryResult }
}
