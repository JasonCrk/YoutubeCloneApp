import { useMutation } from '@tanstack/react-query'

import toast from 'react-hot-toast'

import { createChannelService } from '@/features/channel/services'

export const useCreateChannel = () => {
  const {
    mutate: mutateCreateChannel,
    mutateAsync: mutateAsyncCreateChannel,
    ...mutationResult
  } = useMutation({
    mutationFn: createChannelService,
    onSuccess: ({ message }) => {
      toast.success(message, {
        duration: 2000,
        position: 'bottom-left'
      })
    }
  })

  return { mutateAsyncCreateChannel, mutateCreateChannel, ...mutationResult }
}
