import { useMutation } from '@tanstack/react-query'

import { switchChannelService } from '@/features/channel/services'

export const useSwitchChannel = () => {
  const {
    mutate: mutateSwitchChannel,
    mutateAsync: mutateAsyncSwitchChannel,
    ...mutationResult
  } = useMutation({
    mutationFn: switchChannelService
  })

  return { mutateAsyncSwitchChannel, mutateSwitchChannel, ...mutationResult }
}
