import type { SimpleVideoItemAdapter } from '@/features/video/models'

import { simpleChannelAdapterMock } from '@/features/channel/mocks/models'

export const simpleVideoItemAdapterMock: SimpleVideoItemAdapter = {
  channel: simpleChannelAdapterMock,
  id: 1,
  publicationDate: new Date(),
  thumbnailUrl: 'http://images.com/test_thumnail.png',
  title: 'title',
  views: 10
}
