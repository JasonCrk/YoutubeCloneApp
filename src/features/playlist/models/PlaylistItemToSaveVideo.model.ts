import { Visibility } from '@/models/types'

import type { PlaylistId, PlaylistName } from '@/features/playlist/types'

export interface PlaylistItemToSaveVideo {
  id: PlaylistId
  name: PlaylistName
  visibility: Visibility
  video_is_saved: boolean
}

export interface PlaylistItemToSaveVideoAdapter {
  id: PlaylistId
  name: PlaylistName
  visibility: Visibility
  isVideoSaved: boolean
}
