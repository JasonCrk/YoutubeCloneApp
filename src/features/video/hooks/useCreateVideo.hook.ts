import { useMutation } from '@tanstack/react-query'

import toast from 'react-hot-toast'

import { createVideoService } from '@/features/video/services'

export const useCreateVideo = () => {
  const {
    mutate: mutateCreateVideo,
    mutateAsync: mutateAsyncCreateVideo,
    ...mutationResult
  } = useMutation({
    mutationFn: createVideoService,
    onSuccess: ({ message }) => {
      toast.success(message, {
        duration: 4000
      })
    }
  })

  return { mutateAsyncCreateVideo, mutateCreateVideo, ...mutationResult }
}
