import { useContext } from 'react'

import {
  CreateChannelModalContext,
  createChannelModalContext
} from '@/features/channel/contexts/CreateChannelModal'

export const useCreateChannelModalContext = (): CreateChannelModalContext => {
  const context = useContext(createChannelModalContext)

  if (!context)
    throw new Error(
      'The component is not found within the CreateChannelModalContext context'
    )

  return context
}
