import { cleanup, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import { AuthState } from '@/store/slices/authSlice'

import ChannelOptions from '@/features/channel/components/ChannelOptions'

import { render } from '@/utils/testing/render'

const IS_AUTHENTICATED: AuthState = {
  accessToken: null,
  isAuth: true,
  refreshToken: null,
  user: {
    id: 1,
    currentChannel: {
      id: 1,
      handle: 'testHandle',
      name: 'test name',
      pictureUrl: null
    }
  }
}

describe('<ChannelOptions />', () => {
  afterEach(cleanup)

  it("Shouldn't show the component if user is not authenticated", () => {
    render(<ChannelOptions />)

    const pictureElement = screen.queryByTestId('ChannelOptions')
    expect(pictureElement).toBeNull()
  })

  it('Should show the channel picture', () => {
    render(<ChannelOptions />, {
      preloadedState: {
        auth: IS_AUTHENTICATED
      }
    })

    const pictureElement = screen.queryByTestId('Picture')
    expect(pictureElement).toBeInTheDocument()
  })

  it('Should show the option menu if user click in the picture channel', async () => {
    render(<ChannelOptions />, {
      preloadedState: {
        auth: IS_AUTHENTICATED
      }
    })

    const user = userEvent.setup()

    const optionMenuHidden = screen.queryByRole('menu')
    expect(optionMenuHidden).toBeNull()

    const pictureElement = screen.getByTestId('Picture')
    await user.click(pictureElement)

    const optionMenuVisible = screen.queryByRole('menu')
    expect(optionMenuVisible).toBeInTheDocument()
  })

  it("Shouldn't show the option menu if user don't click the channel picture", () => {
    render(<ChannelOptions />, {
      preloadedState: {
        auth: IS_AUTHENTICATED
      }
    })

    const optionMenuHidden = screen.queryByRole('menu')
    expect(optionMenuHidden).toBeNull()
  })

  it('Should the option menu contain the channel picture', async () => {
    render(<ChannelOptions />, {
      preloadedState: {
        auth: IS_AUTHENTICATED
      }
    })

    const user = userEvent.setup()

    const pictureElement = screen.getByTestId('Picture')
    await user.click(pictureElement)

    const optionMenu = screen.getByRole('menu')
    const pictureElementIntoOptionMenu = optionMenu.querySelector(
      '[data-testid="Picture"]'
    )

    expect(pictureElementIntoOptionMenu).toBeInTheDocument()
  })

  it('Should the option menu contain the channel name', async () => {
    render(<ChannelOptions />, {
      preloadedState: {
        auth: IS_AUTHENTICATED
      }
    })

    const user = userEvent.setup()

    const pictureElement = screen.getByTestId('Picture')
    await user.click(pictureElement)

    const channelNameElement = screen.queryByText(
      IS_AUTHENTICATED.user!.currentChannel.name
    )

    expect(channelNameElement).toBeInTheDocument()
  })

  it('Should the option menu contain the channel handle', async () => {
    render(<ChannelOptions />, {
      preloadedState: {
        auth: IS_AUTHENTICATED
      }
    })

    const user = userEvent.setup()

    const pictureElement = screen.getByTestId('Picture')
    await user.click(pictureElement)

    const channelHandleElement = screen.queryByText(
      '@' + IS_AUTHENTICATED.user!.currentChannel.handle
    )

    expect(channelHandleElement).toBeInTheDocument()
  })

  it('Should the option menu contain a link to view user channel', async () => {
    render(<ChannelOptions />, {
      preloadedState: {
        auth: IS_AUTHENTICATED
      }
    })

    const user = userEvent.setup()

    const pictureElement = screen.getByTestId('Picture')
    await user.click(pictureElement)

    const viewChannelLink = screen.queryByRole('link', {
      name: /^view your channel/i
    })

    expect(viewChannelLink).toHaveAttribute(
      'href',
      '/@' + IS_AUTHENTICATED.user?.currentChannel.handle
    )
  })

  it('Should the option menu contain the logout menu item', async () => {
    render(<ChannelOptions />, {
      preloadedState: {
        auth: IS_AUTHENTICATED
      }
    })

    const user = userEvent.setup()

    const pictureElement = screen.getByTestId('Picture')
    await user.click(pictureElement)

    const signOutMenuItem = screen.queryByRole('menuitem', {
      name: /^sign out/i
    })

    expect(signOutMenuItem).toBeInTheDocument()
  })

  it('Should the option menu contain the switch account menu item', async () => {
    render(<ChannelOptions />, {
      preloadedState: {
        auth: IS_AUTHENTICATED
      }
    })

    const user = userEvent.setup()

    const pictureElement = screen.getByTestId('Picture')
    await user.click(pictureElement)

    const switchAccountMenuItem = screen.queryByRole('menuitem', {
      name: /^switch account/i
    })

    expect(switchAccountMenuItem).toBeInTheDocument()
  })
})
