import { screen } from '@testing-library/react'

import SearchField from '@components/form/SearchField'

import { renderWithRouter } from '@utils/testing/routerRender'

import { userEvent } from '@testing-library/user-event'

describe('<SearchField />', () => {
  it('Should render component', () => {
    renderWithRouter(<SearchField />)

    const searchFieldComponent = screen.getByTestId('SearchField')

    expect(searchFieldComponent).toBeDefined()
  })

  it('Should contain a input element', () => {
    renderWithRouter(<SearchField />)

    const inputSearch = screen.getByRole('search')

    expect(inputSearch.tagName).toBe('INPUT')
  })

  it('Should the input element have placeholder', () => {
    renderWithRouter(<SearchField />)

    const inputSearch = screen.getByRole('search')

    expect(inputSearch.getAttribute('placeholder')).toBe('Search')
  })

  it('Should contain a button element', () => {
    renderWithRouter(<SearchField />)

    const searchButton = screen.getByRole('button')
    expect(searchButton.tagName).toBe('BUTTON')
  })

  it('Should hide the search icon when the user is not focused on the input search', async () => {
    const { container } = renderWithRouter(<SearchField />)

    const searchIcon = container.querySelector('[data-testid="searchIcon"]')

    expect(searchIcon).toBeNull()
  })

  it('Should show the search icon when the user is focused on the input search', async () => {
    const user = userEvent.setup()
    const { container } = renderWithRouter(<SearchField />)

    const inputSearch = screen.getByRole('search')

    await user.click(inputSearch)

    const searchIcon = container.querySelector('[data-testid="searchIcon"]')

    expect(searchIcon).not.toBeNull()
  })
})
