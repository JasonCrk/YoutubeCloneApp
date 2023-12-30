import { ListResponse } from '@/models/responses'

import { SimpleChannel } from '@/features/channel/models'

export const subscribedChannelsMockResponse: ListResponse<SimpleChannel> = {
  data: [
    {
      id: 1,
      handle: 'testHandle1',
      name: 'testName1',
      picture_url: 'https://www.images.com/test-image-1'
    },
    {
      id: 2,
      handle: 'testHandle2',
      name: 'testName2',
      picture_url: 'https://www.images.com/test-image-2'
    },
    {
      id: 3,
      handle: 'testHandle3',
      name: 'testName3',
      picture_url: 'https://www.images.com/test-image-3'
    }
  ]
}
