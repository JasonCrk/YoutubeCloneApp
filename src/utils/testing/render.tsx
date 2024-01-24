import { PropsWithChildren, ReactElement } from 'react'

import { MemoryRouter, MemoryRouterProps } from 'react-router-dom'

import { Provider } from 'react-redux'

import type { PreloadedState } from '@reduxjs/toolkit'

import { render as reactTestingRender } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'

import { setupStore, type AppStore, type RootState } from '@/store/index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
  routerOptions?: MemoryRouterProps
}

export const render = (
  ui: ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    routerOptions,
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  })

  const Wrapper = ({ children }: PropsWithChildren): JSX.Element => {
    return (
      <Provider store={store}>
        <QueryClientProvider client={testQueryClient}>
          <MemoryRouter {...routerOptions}>{children}</MemoryRouter>
        </QueryClientProvider>
      </Provider>
    )
  }

  return {
    store,
    ...reactTestingRender(ui, { wrapper: Wrapper, ...renderOptions })
  }
}
