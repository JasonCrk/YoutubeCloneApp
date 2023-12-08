import { ReactElement } from 'react'

import { MemoryRouter, MemoryRouterProps } from 'react-router-dom'

import { render } from '@testing-library/react'

export const renderWithRouter = (
  ui: ReactElement,
  memoryRouterProps?: MemoryRouterProps
) => {
  return render(<MemoryRouter {...memoryRouterProps}>{ui}</MemoryRouter>)
}
