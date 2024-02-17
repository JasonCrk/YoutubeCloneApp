import { useMutation } from '@tanstack/react-query'

import { updateCommentService } from '@/features/comment/services'

export const useUpdateComment = () => {
  const {
    mutate: mutateUpdateComment,
    mutateAsync: mutateAsyncUpdateComment,
    ...mutationResult
  } = useMutation({
    mutationFn: updateCommentService
  })

  return { mutateAsyncUpdateComment, mutateUpdateComment, ...mutationResult }
}
