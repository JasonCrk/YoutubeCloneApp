import { useMutation } from '@tanstack/react-query'

import { deleteCommentService } from '@/features/comment/services'

export const useDeleteComment = () => {
  const {
    mutate: mutateDeleteComment,
    mutateAsync: mutateAsyncDeleteComment,
    ...mutationResult
  } = useMutation({
    mutationFn: deleteCommentService
  })

  return { mutateAsyncDeleteComment, mutateDeleteComment, ...mutationResult }
}
