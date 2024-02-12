import type {
  ChannelWithSubscribed,
  ChannelWithSubscribedAdapter,
  CurrentChannelAdapter,
  ListChannel,
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

export const listChannelMock: ListChannel = {
  handle: '@testHandle',
  id: 1,
  name: 'test name',
  picture_url: 'https://images.com/test_image.png',
  subscribers: 10
}

export const simpleChannelAdapterMock: SimpleChannelAdapter = {
  handle: '@testHandle',
  id: 1,
  name: 'test name',
  pictureUrl: 'https://images_test.com/image.png'
}

export const channelWithSubscribedAdapterMock: ChannelWithSubscribedAdapter = {
  handle: '@testHandle',
  id: 1,
  name: 'test name',
  pictureUrl: 'https://imageTest.com/channel_img.png',
  subscribed: false,
  subscribers: 10
}

export const channelWithSubscribedMock: ChannelWithSubscribed = {
  handle: '@testHandle',
  id: 1,
  name: 'test name',
  picture_url: 'https://images.com/test_image.png',
  subscribers: 10,
  subscribed: false
}
