import { screen } from '@testing-library/react'

import { SimpleChannelAdapter } from '@/features/channel/models'
import NavbarAsideSubscriptionLink from '@/features/subscription/components/NavbarAsideSubscriptionLink'

import { render } from '@/utils/testing/render'

const channel: SimpleChannelAdapter = {
  handle: 'testHandle',
  id: 1,
  name: 'testName',
  pictureUrl: 'https://www.images.com/image.png'
}

describe('<NavbarAsideSubscriptionLink />', () => {
  it('Should contain a link to redirect to the channel page', () => {
    render(<NavbarAsideSubscriptionLink {...channel} />)

    const link = screen.getByRole('link')

    expect(link).toHaveAttribute('href', '/@' + channel.handle)
  })

  it('Should show the channel name', () => {
    render(<NavbarAsideSubscriptionLink {...channel} />)

    const channelNameElement = screen.queryByText(channel.name)
    expect(channelNameElement).toBeInTheDocument()
  })

  it('Should show the picture from the channel', () => {
    render(<NavbarAsideSubscriptionLink {...channel} />)

    const pictureElement = screen.getByTestId('Picture')
    const imageElement = pictureElement.querySelector('img')

    expect(imageElement).toHaveAttribute('src', channel.pictureUrl)
  })
})
