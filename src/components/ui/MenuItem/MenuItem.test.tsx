import { screen } from '@testing-library/react'

import MenuItem from '@/components/ui/MenuItem'

import { render } from '@/utils/testing/render'

describe('<MenuItem />', () => {
  it('Should render component', () => {
    render(<MenuItem>test</MenuItem>)

    expect(screen.queryByRole('menuitem')).toBeInTheDocument()
  })

  it('Should contain text by the children prop', () => {
    render(<MenuItem>test</MenuItem>)

    const menuItem = screen.getByRole('menuitem')
    expect(menuItem).toHaveTextContent(/^test$/i)
  })

  it('Should show the startIcon element', () => {
    const startIconTestId = 'startIcon'

    render(
      <MenuItem startIcon={<div data-testid={startIconTestId}></div>}>
        test
      </MenuItem>
    )

    const startIcon = screen.queryByTestId(startIconTestId)
    expect(startIcon).toBeInTheDocument()
  })

  it('Should show the endIcon element', () => {
    const endIconTestId = 'endIcon'

    render(
      <MenuItem endIcon={<div data-testid={endIconTestId}></div>}>
        test
      </MenuItem>
    )

    const endIcon = screen.queryByTestId(endIconTestId)
    expect(endIcon).toBeInTheDocument()
  })
})
