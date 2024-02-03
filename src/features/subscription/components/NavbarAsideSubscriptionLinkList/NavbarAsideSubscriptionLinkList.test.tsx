import { cleanup, screen } from '@testing-library/react'

import { setupServer } from 'msw/node'

import {
  retrieveSubscribedChannelsMockEndpoint,
  subscribedChannelsMockResponse
} from '@/features/subscription/mocks/api'
import NavbarAsideSubscriptionLinkList from '@/features/subscription/components/NavbarAsideSubscriptionLinkList'

import { render } from '@/utils/testing/render'

const server = setupServer(retrieveSubscribedChannelsMockEndpoint)

describe('<NavbarAsideSubscriptionLinkList />', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
    cleanup()
  })

  afterAll(() => {
    server.close()
  })

  it('Should show component if the subscribed channel list is ready', async () => {
    render(<NavbarAsideSubscriptionLinkList />)

    const subscriptionListList = await screen.findByTestId(
      'NavbarAsideSubscriptionLinkList'
    )
    expect(subscriptionListList).toBeInTheDocument()
  })

  it("Shouldn't show component if the subscribed channel list is loading", () => {
    render(<NavbarAsideSubscriptionLinkList />)

    const subscriptionListList = screen.queryByTestId(
      'NavbarAsideSubscriptionLinkList'
    )
    expect(subscriptionListList).toBeNull()
  })

  it('Should show the subscription links if the subscribed channel list is ready', async () => {
    render(<NavbarAsideSubscriptionLinkList />)

    const subscribedChannelLinks = await screen.findAllByTestId(
      'NavbarAsideSubscriptionLink'
    )

    expect(subscribedChannelLinks).toHaveLength(
      subscribedChannelsMockResponse.data.length
    )
  })
})
