import { cleanup, screen } from '@testing-library/react'

import SubscribeButton from '@/features/subscription/components/SubscribeButton'

import { render } from '@/utils/testing/render'

describe('<SubscribeButton />', () => {
  afterEach(cleanup)

  it('Should render component', () => {
    render(<SubscribeButton channelId={1} subscribed />)

    expect(screen.queryByTestId('SubscribeButton')).toBeInTheDocument()
  })

  it('Should contain a only button', () => {
    render(<SubscribeButton channelId={1} subscribed />)

    expect(screen.queryByRole('button')).toBeInTheDocument()
  })

  it('Should show the subscribed message if the subscribed prop is true', () => {
    render(<SubscribeButton channelId={1} subscribed />)

    const subscribeButton = screen.queryByTestId('SubscribeButton')

    expect(subscribeButton).toHaveTextContent('Subscribed')
  })

  it('Should show the unsubscribed message if the subscribed prop is false', () => {
    render(<SubscribeButton channelId={1} subscribed={false} />)

    const subscribeButton = screen.queryByTestId('SubscribeButton')

    expect(subscribeButton).toHaveTextContent('Subscribe')
  })
})
