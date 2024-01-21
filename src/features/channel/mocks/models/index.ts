import {
  CurrentChannelAdapter,
  ListChannelAdapter
} from '@/features/channel/models'

export const currentChannelAdapterMock: CurrentChannelAdapter = {
  id: 1,
  handle: '@testHandle',
  name: 'test name',
  pictureUrl: 'https://images_test.com/image.png'
}

export const listChannelAdapterMock: ListChannelAdapter = {
  ...currentChannelAdapterMock,
  subscribers: 10
}
