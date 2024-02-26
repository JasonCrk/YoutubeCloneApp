import { useMutation } from '@tanstack/react-query'

import toast from 'react-hot-toast'

import { updateChannelService } from '@/features/channel/services'

export const useUpdateChannel = () => {
  const {
    mutate: mutateUpdateChannel,
    mutateAsync: mutateAsyncUpdateChannel,
    ...mutationResult
  } = useMutation({
    mutationFn: updateChannelService,
    onSuccess: ({ message }) => {
      toast.success(message, {
        duration: 1500,
        position: 'bottom-left'
      })
    }
  })

  return { mutateAsyncUpdateChannel, mutateUpdateChannel, ...mutationResult }
}
