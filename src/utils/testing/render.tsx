import { PropsWithChildren, ReactElement } from 'react'

import { MemoryRouter, MemoryRouterProps } from 'react-router-dom'

import { Provider } from 'react-redux'

import type { PreloadedState } from '@reduxjs/toolkit'

import { render as reactTestingRender } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'

import { setupStore, type AppStore, type RootState } from '@store/index'

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
  const Wrapper = ({ children }: PropsWithChildren): JSX.Element => {
    return (
      <Provider store={store}>
        <MemoryRouter {...routerOptions}>{children}</MemoryRouter>
      </Provider>
    )
  }

  return {
    store,
    ...reactTestingRender(ui, { wrapper: Wrapper, ...renderOptions })
  }
}
