import { useQuery } from '@tanstack/react-query'

import type { MessageResponse } from '@/models/responses'
import { listResponseAdapter } from '@/adapters'

import type { CommentItemAdapter } from '@/features/comment/models'
import type { VideoCommentsSortBy } from '@/features/comment/types'
import { retrieveVideoCommentsService } from '@/features/comment/services'
import { commentItemAdapter } from '@/features/comment/adapters'

import type { VideoId } from '@/features/video/types'

export const useFetchVideoComments = (
  videoId: VideoId,
  sortBy?: VideoCommentsSortBy,
  options?: {
    enabled: boolean
  }
) => {
  const { data: videoComments, ...queryResult } = useQuery<
    CommentItemAdapter[],
    MessageResponse
  >({
    queryKey: ['videoComments', videoId, sortBy],
    queryFn: async () => {
      const comments = await retrieveVideoCommentsService({
        videoId,
        params: sortBy ? { sortBy } : undefined
      })
      return listResponseAdapter(comments, commentItemAdapter)
    },
    refetchOnWindowFocus: false,
    ...options
  })

  return { videoComments, ...queryResult }
}
