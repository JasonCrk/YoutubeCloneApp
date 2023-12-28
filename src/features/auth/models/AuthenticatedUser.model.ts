import { UserEmail, UserId, UserUsername } from '@/features/user/types'

import {
  CurrentChannelAdapter,
  CurrentChannel
} from '@/features/channel/models'

export interface AuthenticatedUser {
  id: UserId
  username: UserUsername
  email: UserEmail
  current_channel: CurrentChannel
}

export interface AuthenticatedUserAdapter {
  id: UserId
  currentChannel: CurrentChannelAdapter
}
