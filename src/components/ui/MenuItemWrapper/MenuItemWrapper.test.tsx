import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import MenuItemWrapper from '@/components/ui/MenuItemWrapper'

import { render } from '@/utils/testing/render'

describe('<MenuItemWrapper />', () => {
  it('Should render component', () => {
    render(<MenuItemWrapper>test</MenuItemWrapper>)

    const menuItemWrapper = screen.queryByRole('menuitem', { name: /^test$/i })
    expect(menuItemWrapper).toBeInTheDocument()
  })

  it('Should the component become a link if it has the linkHref prop', async () => {
    render(<MenuItemWrapper linkHref='/test'>test</MenuItemWrapper>)

    const user = userEvent.setup()

    const menuItemWrapper = screen.getByRole('menuitem', { name: /^test$/i })

    await user.click(menuItemWrapper)
  })
})
