import {
  PreloadedState,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit'

import authReducer from '@/store/slices/authSlice'

export const rootReducer = combineReducers({
  auth: authReducer
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
