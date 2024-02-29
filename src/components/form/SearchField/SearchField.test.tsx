import { cleanup, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import SearchField from '@/components/form/SearchField'

import { renderWithRouter } from '@/utils/testing/routerRender'

import { useNavigate } from 'react-router-dom'

describe('<SearchField />', () => {
  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(actual as any),
      useNavigate: vi.fn()
    }
  })

  const useNavigateMock = vi.mocked(useNavigate)

  afterEach(() => {
    cleanup()
    useNavigateMock.mockClear()
  })

  it('Should render component', () => {
    renderWithRouter(<SearchField />)

    const searchFieldComponent = screen.queryByTestId('SearchField')
    expect(searchFieldComponent).toBeInTheDocument()
  })

  it('Should the input search contain a empty text value by default', () => {
    renderWithRouter(<SearchField />)

    const inputSearch = screen.getByPlaceholderText('Search')

    expect(inputSearch).toHaveTextContent('')
  })

  it('Should contain the search button', () => {
    renderWithRouter(<SearchField />)

    const searchButton = screen.queryByRole('button')
    expect(searchButton).toBeInTheDocument()
  })

  it('Should show the search icon if the user is focused on the input search', async () => {
    renderWithRouter(<SearchField />)
    const user = userEvent.setup()

    const inputSearch = screen.getByPlaceholderText('Search')

    await user.click(inputSearch)

    const searchIcon = screen.queryByTestId('searchIcon')
    expect(searchIcon).toBeInTheDocument()
  })

  it("Shouldn't show the search icon if the user is not focused on the input search", async () => {
    renderWithRouter(<SearchField />)

    const searchIcon = screen.queryByTestId('searchIcon')
    expect(searchIcon).toBeNull()
  })

  it('Should redirect to the search page url with search query param if the user does a search correctly with the search button', async () => {
    const searchQuery = 'test'

    const navigateMock = vi.fn()

    renderWithRouter(<SearchField />)

    useNavigateMock.mockReturnValue(navigateMock)

    const user = userEvent.setup()

    const inputSearch = screen.getByPlaceholderText('Search')

    await user.type(inputSearch, searchQuery)

    const searchButton = screen.getByRole('button')

    await user.click(searchButton)

    expect(navigateMock).toHaveBeenCalledOnce()
    expect(navigateMock).toHaveBeenCalledWith(
      '/results?search_query=' + searchQuery
    )
  })

  it('Should redirect to the search page url with search query param if the user does a search correctly with the search button', async () => {
    const searchQuery = 'test'

    const navigateMock = vi.fn()

    renderWithRouter(<SearchField />)

    useNavigateMock.mockReturnValue(navigateMock)

    const user = userEvent.setup()

    const inputSearch = screen.getByPlaceholderText('Search')

    await user.type(inputSearch, searchQuery)

    await user.keyboard('{enter}')

    expect(navigateMock).toHaveBeenCalledOnce()
    expect(navigateMock).toHaveBeenCalledWith(
      '/results?search_query=' + searchQuery
    )
  })
})
