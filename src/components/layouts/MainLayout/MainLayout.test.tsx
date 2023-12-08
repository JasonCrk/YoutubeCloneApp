import { cleanup, screen } from '@testing-library/react'

import MainLayout from '.'

import { render } from '@utils/testing/render'

describe('<MainLayout />', () => {
  afterEach(cleanup)

  it('The <Navbar /> component must be in the <MainLayout />', () => {
    render(<MainLayout />)

    const navbarComponent = screen.getByTestId('TopBar')

    expect(navbarComponent).toBeDefined()
  })
})
