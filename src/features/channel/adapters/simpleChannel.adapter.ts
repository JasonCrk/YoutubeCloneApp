import { SimpleChannelAdapter, SimpleChannel } from '@/features/channel/models'

export const simpleChannelAdapter = (
  response: SimpleChannel
): SimpleChannelAdapter => ({
  id: response.id,
  name: response.name,
  pictureUrl: response.picture_url
})
