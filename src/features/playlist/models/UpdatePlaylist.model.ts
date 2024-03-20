import { Visibility } from '@/models/types'

import type {
  PlaylistDescription,
  PlaylistName,
  PlaylistVideoId
} from '@/features/playlist/types'

export interface UpdatePlaylistInputs {
  name?: PlaylistName
  video_thumbnail?: PlaylistVideoId
  description?: PlaylistDescription
  visibility?: Visibility
}
