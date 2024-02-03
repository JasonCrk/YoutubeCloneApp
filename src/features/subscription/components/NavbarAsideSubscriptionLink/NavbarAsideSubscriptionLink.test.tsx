import { screen } from '@testing-library/react'

import { simpleChannelAdapterMock } from '@/features/channel/mocks/models'

import NavbarAsideSubscriptionLink from '@/features/subscription/components/NavbarAsideSubscriptionLink'

import { render } from '@/utils/testing/render'

describe('<NavbarAsideSubscriptionLink />', () => {
  it('Should contain a link to redirect to the channel page', () => {
    render(<NavbarAsideSubscriptionLink {...simpleChannelAdapterMock} />)

    const link = screen.getByRole('link')

    expect(link).toHaveAttribute('href', '/' + simpleChannelAdapterMock.handle)
  })

  it('Should show the channel name', () => {
    render(<NavbarAsideSubscriptionLink {...simpleChannelAdapterMock} />)

    const channelNameElement = screen.queryByText(simpleChannelAdapterMock.name)
    expect(channelNameElement).toBeInTheDocument()
  })

  it('Should show the picture from the channel', () => {
    render(<NavbarAsideSubscriptionLink {...simpleChannelAdapterMock} />)

    const pictureElement = screen.getByTestId('Picture')
    const imageElement = pictureElement.querySelector('img')

    expect(imageElement).toHaveAttribute(
      'src',
      simpleChannelAdapterMock.pictureUrl
    )
  })
})
