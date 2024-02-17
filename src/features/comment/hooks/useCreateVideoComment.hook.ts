import { useMutation } from '@tanstack/react-query'

import { createVideoCommentService } from '@/features/comment/services'

export const useCreateVideoComment = () => {
  const { mutate: mutateCreateComment, ...mutationResult } = useMutation({
    mutationFn: createVideoCommentService
  })

  return { mutateCreateComment, ...mutationResult }
}
