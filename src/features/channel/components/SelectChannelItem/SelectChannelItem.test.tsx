import { cleanup, screen } from '@testing-library/react'

import { listChannelAdapterMock } from '@/features/channel/mocks/models'

import SelectChannelItem from '@/features/channel/components/SelectChannelItem'

import { render } from '@/utils/testing/render'

const channelMockData = {
  ...listChannelAdapterMock,
  currentChannelId: 1
}

describe('<SelectChannelItem />', () => {
  afterEach(cleanup)

  it('Should render component', () => {
    render(<SelectChannelItem {...channelMockData} />)

    expect(screen.queryByTestId('SelectChannelItem')).toBeInTheDocument()
  })

  it('Should show the channel picture', () => {
    render(<SelectChannelItem {...channelMockData} />)

    const channelPicture = screen.queryByTestId('Picture')

    expect(channelPicture).toBeInTheDocument()

    const imageElement = channelPicture?.querySelector('img')

    expect(imageElement).toBeInTheDocument()
    expect(imageElement).toHaveAttribute('src', channelMockData.pictureUrl)
  })

  it('Should show the channel name', () => {
    render(<SelectChannelItem {...channelMockData} />)

    const channelName = screen.queryByText(channelMockData.name)
    expect(channelName).toBeInTheDocument()
  })

  it('Should show the channel handle', () => {
    render(<SelectChannelItem {...channelMockData} />)

    const channelHandle = screen.queryByText(channelMockData.handle)
    expect(channelHandle).toBeInTheDocument()
  })

  it("Should show the number of channel subscribers if the channel' subscribers is greater than 0", () => {
    render(<SelectChannelItem {...channelMockData} />)

    const channelSubscribers = screen.queryByText(
      channelMockData.subscribers + ' subscribers'
    )
    expect(channelSubscribers).toBeInTheDocument()
  })

  it("Shouldn't show the number of channel subscribers if the channel' subscribers are less than 0", () => {
    render(<SelectChannelItem {...channelMockData} subscribers={0} />)

    const channelSubscribers = screen.queryByText(
      channelMockData.subscribers + ' subscribers'
    )
    expect(channelSubscribers).toBeNull()
  })

  it("Shouldn't show the message that there are no subscribers if the channel's subscribers are greater than 0", () => {
    render(<SelectChannelItem {...channelMockData} />)

    const noChannelSubscribers = screen.queryByText(/^no subscribers$/i)
    expect(noChannelSubscribers).toBeNull()
  })

  it("Should show the message that there are no subscribers if the channel's subscribers are equal to 0", () => {
    render(<SelectChannelItem {...channelMockData} subscribers={0} />)

    const noChannelSubscribers = screen.queryByText(/^no subscribers$/i)
    expect(noChannelSubscribers).toBeInTheDocument()
  })

  it('Should show "active" icon if the channel id is equal to the current active channel id', () => {
    render(<SelectChannelItem {...channelMockData} />)

    const activeIcon = screen.queryByTestId('CheckIcon')
    expect(activeIcon).toBeInTheDocument()
  })

  it('Shouldn\'t show "active" icon if the channel id is not equal to the current active channel id', () => {
    render(<SelectChannelItem {...channelMockData} currentChannelId={10} />)

    const activeIcon = screen.queryByTestId('CheckIcon')
    expect(activeIcon).toBeNull()
  })
})
