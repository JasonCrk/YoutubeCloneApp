import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { AuthenticatedUserAdapter } from '@/features/auth/models'
import { JwtToken } from '@/features/auth/types'
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage
} from '@/features/auth/utils'

export interface AuthState {
  isAuth: boolean
  accessToken: JwtToken | null
  refreshToken: JwtToken | null
  user: AuthenticatedUserAdapter | null
}

type AuthStateTokens = Pick<AuthState, 'accessToken' | 'refreshToken'>

const initialState: AuthState = {
  isAuth: false,
  accessToken: getAccessTokenFromLocalStorage(),
  refreshToken: getRefreshTokenFromLocalStorage(),
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
    setUser: (state, action: PayloadAction<AuthenticatedUserAdapter>) => {
      state.user = action.payload
      state.isAuth = true
    },
    setAuthTokens: (state, action: PayloadAction<AuthStateTokens>) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    logout: state => {
      state.accessToken = null
      state.refreshToken = null
      state.user = null
      state.isAuth = false
    }
  }
})

export const { setAuth, setUser, logout, setAuthTokens } = authSlice.actions

export default authSlice.reducer
