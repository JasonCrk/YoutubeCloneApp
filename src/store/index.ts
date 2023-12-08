import {
  PreloadedState,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'

export const rootReducer = combineReducers({
  auth: authReducer
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
