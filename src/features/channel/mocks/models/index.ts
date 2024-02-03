import {
  CurrentChannelAdapter,
  ListChannelAdapter,
  SimpleChannelAdapter
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

export const simpleChannelAdapterMock: SimpleChannelAdapter = {
  handle: '@testHandle',
  id: 1,
  name: 'test name',
  pictureUrl: 'https://images_test.com/image.png'
}
