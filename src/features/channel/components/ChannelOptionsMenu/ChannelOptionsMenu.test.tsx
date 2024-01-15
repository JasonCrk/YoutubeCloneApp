import { cleanup, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import { CurrentChannelAdapter } from '@/features/channel/models'

import ChannelOptionsMenu from '@/features/channel/components/ChannelOptionsMenu'
import * as localStorageUtils from '@/features/auth/utils/localStorage.util'

import { render } from '@/utils/testing/render'

const currentChannel: CurrentChannelAdapter = {
  handle: 'testHandle',
  id: 1,
  name: 'test name',
  pictureUrl: 'https://images_test.com/image.png'
}

describe('<ChannelOptionsMenu />', () => {
  const windowLocation = window.location

  const onCloseMock = vi.fn()
  const reloadWindowSpy = vi.fn()

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: reloadWindowSpy }
    })
  })

  afterEach(() => {
    cleanup()
    onCloseMock.mockClear()
    reloadWindowSpy.mockClear()
  })

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: windowLocation
    })
  })

  it('Should render menu', () => {
    render(
      <ChannelOptionsMenu
        anchorEl={document.createElement('div')}
        channel={currentChannel}
        onClose={onCloseMock}
      />
    )

    expect(screen.queryByRole('menu')).toBeInTheDocument()
  })

  it('Should contain the channel picture', () => {
    render(
      <ChannelOptionsMenu
        anchorEl={document.createElement('div')}
        channel={currentChannel}
        onClose={onCloseMock}
      />
    )

    const channelPictureElement = screen.queryByAltText(currentChannel.name)
    expect(channelPictureElement).toBeInTheDocument()
  })

  it('Should contain the channel name', () => {
    render(
      <ChannelOptionsMenu
        anchorEl={document.createElement('div')}
        channel={currentChannel}
        onClose={onCloseMock}
      />
    )

    const channelNameElement = screen.queryByText(currentChannel.name)
    expect(channelNameElement).toBeInTheDocument()
  })

  it('Should contain the channel handle', () => {
    render(
      <ChannelOptionsMenu
        anchorEl={document.createElement('div')}
        channel={currentChannel}
        onClose={onCloseMock}
      />
    )

    const channelHandleElement = screen.queryByText('@' + currentChannel.handle)
    expect(channelHandleElement).toBeInTheDocument()
  })

  it('Should contain the link to redirect to the channel page', () => {
    render(
      <ChannelOptionsMenu
        anchorEl={document.createElement('div')}
        channel={currentChannel}
        onClose={onCloseMock}
      />
    )

    const channelLink = screen.queryByRole('link', {
      name: /^view your channel$/i
    })
    expect(channelLink).toHaveAttribute('href', '/@' + currentChannel.handle)
  })

  it('Should contain the switch account menu option', () => {
    render(
      <ChannelOptionsMenu
        anchorEl={document.createElement('div')}
        channel={currentChannel}
        onClose={onCloseMock}
      />
    )

    const switchAccountMenuOption = screen.queryByRole('menuitem', {
      name: /^switch account$/i
    })
    expect(switchAccountMenuOption).toBeInTheDocument()
  })

  it('Should contain the menu option logout', () => {
    render(
      <ChannelOptionsMenu
        anchorEl={document.createElement('div')}
        channel={currentChannel}
        onClose={onCloseMock}
      />
    )

    const logoutMenuOption = screen.queryByRole('menuitem', {
      name: /^sign out$/i
    })
    expect(logoutMenuOption).toBeInTheDocument()
  })

  it('Should remove the access token from localStorage if the user click in the logout menu option', async () => {
    render(
      <ChannelOptionsMenu
        anchorEl={document.createElement('div')}
        channel={currentChannel}
        onClose={onCloseMock}
      />
    )

    const user = userEvent.setup()

    const removeAccessTokenFromLocalStorageSpy = vi.spyOn(
      localStorageUtils,
      'removeAccessTokenFromLocalStorage'
    )

    const logoutMenuOption = screen.getByRole('menuitem', {
      name: /^sign out$/i
    })

    await user.click(logoutMenuOption)

    expect(removeAccessTokenFromLocalStorageSpy).toHaveBeenCalledOnce()
  })

  it('Should remove the refresh token from localStorage if the user click in the logout menu option', async () => {
    render(
      <ChannelOptionsMenu
        anchorEl={document.createElement('div')}
        channel={currentChannel}
        onClose={onCloseMock}
      />
    )

    const user = userEvent.setup()

    const removeRefreshTokenFromLocalStorageSpy = vi.spyOn(
      localStorageUtils,
      'removeRefreshTokenFromLocalStorage'
    )

    const logoutMenuOption = screen.getByRole('menuitem', {
      name: /^sign out$/i
    })

    await user.click(logoutMenuOption)

    expect(removeRefreshTokenFromLocalStorageSpy).toHaveBeenCalledOnce()
  })

  it('Should reload the window if the user click in the logout menu option', async () => {
    render(
      <ChannelOptionsMenu
        anchorEl={document.createElement('div')}
        channel={currentChannel}
        onClose={onCloseMock}
      />
    )

    const user = userEvent.setup()

    const logoutMenuOption = screen.getByRole('menuitem', {
      name: /^sign out$/i
    })

    await user.click(logoutMenuOption)

    expect(window.location.reload).toHaveBeenCalledOnce()
  })
})
