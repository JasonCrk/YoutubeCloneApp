import { cleanup, screen } from '@testing-library/react'

import TopBar from '@/components/ui/TopBar'

import { render } from '@/utils/testing/render'

describe('<TopBar />', () => {
  afterEach(cleanup)

  it('Should render component', () => {
    render(<TopBar />)

    const topBar = screen.queryByTestId('TopBar')
    expect(topBar).toBeInTheDocument()
  })

  it('Should contain the <NavbarAsideToggleButton /> component', () => {
    render(<TopBar />)

    const navbarAsideToggleButton = screen.queryByTestId(
      'NavbarAsideToggleButton'
    )
    expect(navbarAsideToggleButton).toBeInTheDocument()
  })

  it('Should contain the <Logo /> component', () => {
    render(<TopBar />)

    const logoComponent = screen.queryByTestId('Logo')
    expect(logoComponent).toBeInTheDocument()
  })

  it('Should contain <SearchField /> component', () => {
    render(<TopBar />)

    const searchField = screen.queryByTestId('SearchField')
    expect(searchField).toBeInTheDocument()
  })

  it('Should contain <TopBarOptions /> component', () => {
    render(<TopBar />)

    const topBarOptions = screen.queryByTestId('TopBarOptions')
    expect(topBarOptions).toBeInTheDocument()
  })
})
