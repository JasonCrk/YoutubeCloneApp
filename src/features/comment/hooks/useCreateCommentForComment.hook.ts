import { useMutation } from '@tanstack/react-query'

import { createCommentForCommentService } from '@/features/comment/services'

export const useCreateCommentForComment = () => {
  const {
    mutate: mutateCreateCommentForComment,
    mutateAsync: mutateAsyncCreateCommentForComment,
    ...mutationResult
  } = useMutation({
    mutationFn: createCommentForCommentService
  })

  return {
    mutateCreateCommentForComment,
    mutateAsyncCreateCommentForComment,
    ...mutationResult
  }
}
