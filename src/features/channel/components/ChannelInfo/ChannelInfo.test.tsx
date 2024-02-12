import { cleanup, screen } from '@testing-library/react'

import ChannelInfo from '@/features/channel/components/ChannelInfo'

import { listChannelAdapterMock } from '@/features/channel/mocks/models'

import { render } from '@/utils/testing/render'

describe('<ChannelInfo />', () => {
  afterEach(() => {
    cleanup()
  })

  it('Should render component', () => {
    render(<ChannelInfo channel={listChannelAdapterMock} />)

    expect(screen.queryByTestId('ChannelInfo')).toBeInTheDocument()
  })

  it('Should contain the channel picture', () => {
    render(<ChannelInfo channel={listChannelAdapterMock} />)

    expect(screen.queryByTestId('Picture')).toBeInTheDocument()
    expect(screen.queryByRole('img')).toHaveAttribute(
      'src',
      listChannelAdapterMock.pictureUrl
    )
  })

  it('The channel picture should be wrapped with a link to redirect to channel profile', () => {
    render(<ChannelInfo channel={listChannelAdapterMock} />)

    const pictureLink = screen.queryByTestId('pictureLinkToChannelProfile')

    expect(pictureLink).toHaveAttribute(
      'href',
      '/' + listChannelAdapterMock.handle
    )
    expect(
      pictureLink?.querySelector('[data-testid="Picture"]')
    ).toBeInTheDocument()
  })

  it('The channel name should have href attribute for redirect to channel profile', () => {
    render(<ChannelInfo channel={listChannelAdapterMock} />)

    const channelName = screen.queryByText(listChannelAdapterMock.name)

    expect(channelName).toHaveAttribute(
      'href',
      '/' + listChannelAdapterMock.handle
    )
  })

  it('Should show the channel subscriptions number if the total subscriptions is greater than 0', () => {
    render(<ChannelInfo channel={listChannelAdapterMock} />)

    expect(
      screen.queryByText(
        new RegExp(`^${listChannelAdapterMock.subscribers} subscribers$`)
      )
    ).toBeInTheDocument()
  })

  it("Shouldn't show the channel subscriptions number if the total subscriptions is equal than 0", () => {
    render(
      <ChannelInfo channel={{ ...listChannelAdapterMock, subscribers: 0 }} />
    )

    expect(screen.queryByText('No subscribers')).toBeInTheDocument()
  })
})
