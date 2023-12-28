import { cleanup, screen } from '@testing-library/react'

import Logo from '.'

import { renderWithRouter } from '@/utils/testing/routerRender'

describe('<Logo />', () => {
  afterEach(cleanup)

  it('Should contain a element with "link" role', () => {
    renderWithRouter(<Logo />)

    const logo = screen.getByRole('link')
    expect(logo).toBeInTheDocument()
  })

  it('Should contain the youtube name', () => {
    renderWithRouter(<Logo />)

    expect(screen.getByText(/YouTube/)).toBeInTheDocument()
  })

  it('Should the role element "link" be a <a />', () => {
    renderWithRouter(<Logo />)

    const logo = screen.getByRole('link')
    expect(logo.tagName).toBe('A')
  })

  it('The link should redirect to the home page', () => {
    renderWithRouter(<Logo />)

    const logo = screen.getByRole('link')
    expect(logo.getAttribute('href')).toBe('/')
  })
})
