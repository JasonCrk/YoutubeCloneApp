import { cleanup, screen } from '@testing-library/react'

import MenuItem from '@/components/ui/MenuItem'

import { render } from '@/utils/testing/render'

describe('<MenuItem />', () => {
  const startIconTestId = 'startIcon'
  const endIconTestId = 'endIcon'

  afterEach(cleanup)

  it('Should render component', () => {
    render(<MenuItem>test</MenuItem>)

    expect(screen.queryByRole('menuitem')).toBeInTheDocument()
  })

  it('Should contain text by the children prop', () => {
    render(<MenuItem>test</MenuItem>)

    const menuItem = screen.getByRole('menuitem')
    expect(menuItem).toHaveTextContent(/^test$/i)
  })

  it('Should show the start icon if the start icon prop exists', () => {
    render(
      <MenuItem startIcon={<div data-testid={startIconTestId}></div>}>
        test
      </MenuItem>
    )

    const startIcon = screen.queryByTestId(startIconTestId)
    expect(startIcon).toBeInTheDocument()
  })

  it("Shouldn't show the start icon if the start icon prop does not exist", () => {
    render(<MenuItem>test</MenuItem>)

    const startIcon = screen.queryByTestId(startIconTestId)
    expect(startIcon).toBeNull()
  })

  it('Should show the end icon if the end icon prop exists', () => {
    render(
      <MenuItem endIcon={<div data-testid={endIconTestId}></div>}>
        test
      </MenuItem>
    )

    const endIcon = screen.queryByTestId(endIconTestId)
    expect(endIcon).toBeInTheDocument()
  })

  it("Shouldn't show the end icon if the end icon prop does not exist", () => {
    render(<MenuItem>test</MenuItem>)

    const endIcon = screen.queryByTestId(endIconTestId)
    expect(endIcon).toBeNull()
  })
})
