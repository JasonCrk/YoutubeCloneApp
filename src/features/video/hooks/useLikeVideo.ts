import { useMutation } from '@tanstack/react-query'

import toast from 'react-hot-toast'

import { likeVideoService } from '@/features/video/services'

export const useLikeVideo = () => {
  const { mutate: mutateLikeVideo, ...mutationResult } = useMutation({
    mutationFn: likeVideoService,
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

  return { mutateLikeVideo, ...mutationResult }
}
