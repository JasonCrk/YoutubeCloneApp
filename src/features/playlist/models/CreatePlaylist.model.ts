import { Visibility } from '@/models/types'

import type { PlaylistName } from '@/features/playlist/types'

export interface CreatePlaylistInputs {
  name: PlaylistName
  visibility: Visibility
}
