import type { PlaylistId, PlaylistName } from '@/features/playlist/types'

import type { ChannelId } from '@/features/channel/types'

import type { VideoId } from '@/features/video/types'

export interface PlaylistDataProps {
  id: PlaylistId
  name: PlaylistName
  channelId: ChannelId
  firstVideoId: VideoId | null
}
