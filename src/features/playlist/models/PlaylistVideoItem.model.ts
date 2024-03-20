import type {
  PlaylistVideoId,
  PlaylistVideoPosition
} from '@/features/playlist/types'

import type {
  SimpleVideoItem,
  SimpleVideoItemAdapter
} from '@/features/video/models'

export interface PlaylistVideoItem {
  id: PlaylistVideoId
  position: PlaylistVideoPosition
  video: SimpleVideoItem
}

export interface PlaylistVideoItemAdapter {
  id: PlaylistVideoId
  position: PlaylistVideoPosition
  video: SimpleVideoItemAdapter
}
