import { ListResponse, MessageResponse } from '@/models/responses'

import { ListChannel } from '@/features/channel/models'

export const ownChannelsMockResponse: ListResponse<ListChannel> = {
  data: [
    {
      id: 1,
      handle: '@testHandle1',
      name: 'test name 1',
      picture_url: null,
      subscribers: 10
    },
    {
      id: 2,
      handle: '@testHandle2',
      name: 'test name 2',
      picture_url: null,
      subscribers: 0
    },
    {
      id: 3,
      handle: '@testHandle3',
      name: 'test name 3',
      picture_url: null,
      subscribers: 3
    }
  ]
}

export const createChannelMockResponse: MessageResponse = {
  message: 'create channel test message'
}
