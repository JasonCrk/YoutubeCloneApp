import { useMutation } from '@tanstack/react-query'

import toast from 'react-hot-toast'

import { dislikeVideoService } from '@/features/video/services'

export const useDislikeVideo = () => {
  const { mutate: mutateDislikeVideo, ...mutateResult } = useMutation({
    mutationFn: dislikeVideoService,
    onSuccess: ({ message }) => {
      toast(message, {
        position: 'bottom-left',
        duration: 1500
      })
    },
    onError: () => {
      toast.error('An error has occurred, please try again later', {
        position: 'bottom-left'
      })
    }
  })

  return { mutateDislikeVideo, ...mutateResult }
}
