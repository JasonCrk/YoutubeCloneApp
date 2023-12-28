import {
  AuthenticatedUser,
  AuthenticatedUserAdapter
} from '@/features/auth/models'
import { currentChannelAdapter } from '@/features/channel/adapters'

export const authenticatedUserAdapter = (
  user: AuthenticatedUser
): AuthenticatedUserAdapter => ({
  id: user.id,
  currentChannel: currentChannelAdapter(user.current_channel)
})
