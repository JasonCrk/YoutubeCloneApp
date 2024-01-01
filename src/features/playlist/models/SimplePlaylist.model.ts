import { PlaylistId, PlaylistName } from '@/features/playlist/types'

export interface SimplePlaylist {
  id: PlaylistId
  name: PlaylistName
}

export interface SimplePlaylistAdapter {
  id: PlaylistId
  name: PlaylistName
}
