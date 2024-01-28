import { cleanup, screen } from '@testing-library/react'

import Logo from '@/components/ui/Logo'

import { renderWithRouter } from '@/utils/testing/routerRender'

describe('<Logo />', () => {
  afterEach(cleanup)

  it('Should rende component', () => {
    renderWithRouter(<Logo />)

    expect(screen.queryByTestId('Logo')).toBeInTheDocument()
  })

  it('Should contain the image', () => {
    renderWithRouter(<Logo />)

    const logoImage = screen.queryByAltText(/^youtube clone$/i)
    expect(logoImage).toBeInTheDocument()
  })

  it('Should contain the youtube clone name', () => {
    renderWithRouter(<Logo />)

    expect(screen.queryByText('YouTube')).toBeInTheDocument()
  })

  it('The link should redirect to the home page', () => {
    renderWithRouter(<Logo />)

    const logoLink = screen.queryByRole('link')
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('Should the link wrap all components', () => {
    const { container } = renderWithRouter(<Logo />)

    const logoLink = container.children.item(0)

    expect(logoLink).toHaveAttribute('role', 'link')
    expect(logoLink).toHaveAttribute('href', '/')
  })
})
