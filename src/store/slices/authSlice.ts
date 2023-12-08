import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { AuthenticatedUserAdapterResponse } from '@features/auth/models'
import { AuthAccessToken, AuthRefreshToken } from '@features/auth/types'

export interface AuthState {
  isAuth: boolean
  accessToken: AuthAccessToken | null
  refreshToken: AuthRefreshToken | null
  user: AuthenticatedUserAdapterResponse | null
}

const initialState: AuthState = {
  isAuth: false,
  accessToken: null,
  refreshToken: null,
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    }
  }
})

export const { setAuth } = authSlice.actions

export default authSlice.reducer
