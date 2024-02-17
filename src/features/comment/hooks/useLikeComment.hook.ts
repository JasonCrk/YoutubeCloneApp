import { useMutation } from '@tanstack/react-query'

import { likeCommentService } from '@/features/comment/services'

export const useLikeComment = () => {
  const {
    mutate: mutateLikeComment,
    mutateAsync: mutateAsyncLikeComment,
    ...mutationResult
  } = useMutation({
    mutationFn: likeCommentService
  })

  return { mutateLikeComment, mutateAsyncLikeComment, ...mutationResult }
}
