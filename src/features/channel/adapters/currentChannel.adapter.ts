import {
  CurrentChannel,
  CurrentChannelAdapter
} from '@/features/channel/models'

export const currentChannelAdapter = (
  currentChannel: CurrentChannel
): CurrentChannelAdapter => ({
  handle: currentChannel.handle,
  id: currentChannel.id,
  name: currentChannel.name,
  pictureUrl: currentChannel.picture_url
})
