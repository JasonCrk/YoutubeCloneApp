import { useMutation } from '@tanstack/react-query'

import { dislikeCommentService } from '@/features/comment/services'

export const useDislikeComment = () => {
  const {
    mutate: mutateDislikeComment,
    mutateAsync: mutateAsyncDislikeComment,
    ...mutationResult
  } = useMutation({
    mutationFn: dislikeCommentService
  })

  return { mutateDislikeComment, mutateAsyncDislikeComment, ...mutationResult }
}
