import { protectedChannelEndpoint } from '@/features/channel/services'

import { retrieveSubscribedChannelsService } from '@/features/subscription/services/endpoints'

import { subscribedChannelsMockResponse } from '@/features/subscription/mocks/api'

const protectedChannelEndpointSpy = vi
  .spyOn(protectedChannelEndpoint, 'get')
  .mockImplementation(() =>
    Promise.resolve({
      data: subscribedChannelsMockResponse
    })
  )

describe('retrieveSubscribedChannels service function', () => {
  it('Should called the protectChannelEndpoint with HTTP GET method', async () => {
    await retrieveSubscribedChannelsService()

    expect(protectedChannelEndpointSpy).toHaveBeenCalledOnce()
  })

  it('Should return the response from the api', async () => {
    const subscribedChannels = await retrieveSubscribedChannelsService()
    expect(subscribedChannels).toEqual(subscribedChannelsMockResponse)
  })
})
