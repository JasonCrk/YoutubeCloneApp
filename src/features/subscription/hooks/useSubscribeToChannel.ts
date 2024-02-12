import { useMutation } from '@tanstack/react-query'

import toast from 'react-hot-toast'

import { subscribeToChannelService } from '@/features/subscription/services'

export const useSubscribeToChannel = () => {
  const { mutate: mutateSubscribeToChannel, ...mutationResult } = useMutation({
    mutationFn: subscribeToChannelService,
    onSuccess: ({ message }) => {
      toast(message, {
        position: 'bottom-left',
        duration: 1500
      })
    },
    onError: () => {
      toast(
        'An error occurred while trying to subscribe to the channel, please try again later.',
        {
          position: 'bottom-left',
          duration: 1500
        }
      )
    }
  })

  return { mutateSubscribeToChannel, ...mutationResult }
}
