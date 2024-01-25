import { cleanup, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import CreateChannelModalProvider from '@/features/channel/contexts/CreateChannelModal/Provider'

import CreateChannelMenuOption from '@/features/channel/components/CreateChannelMenuOption'

import { render } from '@/utils/testing/render'

describe('<CreateChannelMenuOption />', () => {
  afterEach(cleanup)

  it('Should render component', () => {
    render(
      <CreateChannelModalProvider>
        <CreateChannelMenuOption />
      </CreateChannelModalProvider>
    )

    expect(screen.queryByTestId('CreateChannelMenuOption')).toBeInTheDocument()
  })

  it('Should the component have a menu item role and text content', () => {
    render(
      <CreateChannelModalProvider>
        <CreateChannelMenuOption />
      </CreateChannelModalProvider>
    )

    const createChannelMenuItem = screen.queryByRole('menuitem')

    expect(createChannelMenuItem).toBeInTheDocument()
    expect(createChannelMenuItem).toHaveTextContent(/^add account$/i)
  })

  it('Should open the create channel menu if the user click in the component', async () => {
    render(
      <CreateChannelModalProvider>
        <CreateChannelMenuOption />
      </CreateChannelModalProvider>
    )

    const user = userEvent.setup()

    const unopenedCreateChannelModal =
      screen.queryByTestId('CreateChannelModal')

    expect(unopenedCreateChannelModal).toBeNull()

    const createChannelMenuItem = screen.getByRole('menuitem')

    await user.click(createChannelMenuItem)

    const createChannelModal = screen.queryByTestId('CreateChannelModal')

    expect(createChannelModal).toBeInTheDocument()
  })
})
