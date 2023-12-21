import { UserEmail, UserId, UserUsername } from '@features/user/types'

import {
  CurrentChannelAdapterResponse,
  CurrentChannelResponse
} from '@features/channel/models'

export interface AuthenticatedUserResponse {
  id: UserId
  username: UserUsername
  email: UserEmail
  current_channel: CurrentChannelResponse
}

export interface AuthenticatedUserAdapterResponse {
  id: UserId
  currentChannel: CurrentChannelAdapterResponse
}
