import { useQuery } from '@tanstack/react-query'

import type { MessageResponse } from '@/models/responses'
import { listResponseAdapter } from '@/adapters'

import type { CommentItemAdapter } from '@/features/comment/models'
import type { CommentId } from '@/features/comment/types'
import { retrieveCommentsOfCommentService } from '@/features/comment/services'
import { commentItemAdapter } from '@/features/comment/adapters'

export const useFetchCommentsOfComment = (
  commentId: CommentId,
  { enabled }: { enabled: boolean }
) => {
  const { data: comments, ...queryResult } = useQuery<
    CommentItemAdapter[],
    MessageResponse
  >({
    enabled,
    queryKey: ['commentsOfComment', commentId],
    queryFn: async () => {
      const comments = await retrieveCommentsOfCommentService(commentId)
      return listResponseAdapter(comments, commentItemAdapter)
    },
    refetchOnWindowFocus: false
  })

  return { comments, ...queryResult }
}
