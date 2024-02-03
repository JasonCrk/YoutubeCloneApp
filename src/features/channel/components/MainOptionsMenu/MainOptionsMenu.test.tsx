import { cleanup, screen } from '@testing-library/react'

import { authStateMock } from '@/mocks/store'
import { currentChannelAdapterMock } from '@/features/channel/mocks/models'

import MainOptionsMenu from '@/features/channel/components/MainOptionsMenu'

import { render } from '@/utils/testing/render'

describe('<MainOptionsMenu />', () => {
  const onChangeMenuMock = vi.fn()

  afterEach(() => {
    cleanup()
    onChangeMenuMock.mockClear()
  })

  it('Should render menu', () => {
    render(<MainOptionsMenu onChangeMenu={onChangeMenuMock} />, {
      preloadedState: {
        auth: authStateMock
      }
    })

    expect(screen.queryByTestId('MainOptionsMenu')).toBeInTheDocument()
  })

  it('Should contain the channel picture', () => {
    render(<MainOptionsMenu onChangeMenu={onChangeMenuMock} />, {
      preloadedState: {
        auth: authStateMock
      }
    })

    const channelPictureElement = screen.queryByAltText(
      currentChannelAdapterMock.name
    )
    expect(channelPictureElement).toBeInTheDocument()
  })

  it('Should contain the channel name', () => {
    render(<MainOptionsMenu onChangeMenu={onChangeMenuMock} />, {
      preloadedState: {
        auth: authStateMock
      }
    })

    const channelNameElement = screen.queryByText(
      currentChannelAdapterMock.name
    )
    expect(channelNameElement).toBeInTheDocument()
  })

  it('Should contain the channel handle', () => {
    render(<MainOptionsMenu onChangeMenu={onChangeMenuMock} />, {
      preloadedState: {
        auth: authStateMock
      }
    })

    const channelHandleElement = screen.queryByText(
      currentChannelAdapterMock.handle
    )
    expect(channelHandleElement).toBeInTheDocument()
  })

  it('Should contain the link to redirect to the channel page', () => {
    render(<MainOptionsMenu onChangeMenu={onChangeMenuMock} />, {
      preloadedState: {
        auth: authStateMock
      }
    })

    const channelLink = screen.queryByRole('link', {
      name: /^view your channel$/i
    })
    expect(channelLink).toHaveAttribute(
      'href',
      '/' + currentChannelAdapterMock.handle
    )
  })

  it('Should contain the switch account menu option', () => {
    render(<MainOptionsMenu onChangeMenu={onChangeMenuMock} />, {
      preloadedState: {
        auth: authStateMock
      }
    })

    const switchAccountMenuOption = screen.queryByRole('menuitem', {
      name: /^switch account$/i
    })
    expect(switchAccountMenuOption).toBeInTheDocument()
  })
})
