import type { PlaylistId, PlaylistName } from '@/features/playlist/types'

export interface SimplePlaylistList {
  id: PlaylistId
  name: PlaylistName
}

export interface SimplePlaylistListAdapter {
  id: PlaylistId
  name: PlaylistName
}
