import { AuthState } from '@/store/slices/authSlice'

import { currentChannelAdapterMock } from '@/features/channel/mocks/models'

export const authStateMock: AuthState = {
  isAuth: true,
  accessToken: 'testAccessToken',
  refreshToken: 'testRefreshToken',
  user: {
    id: 1,
    email: 'test@gmail.com',
    currentChannel: currentChannelAdapterMock
  }
}

export const notAuthStateMock: AuthState = {
  isAuth: false,
  accessToken: null,
  refreshToken: null,
  user: null
}
