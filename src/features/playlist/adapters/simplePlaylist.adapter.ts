import {
  SimplePlaylist,
  SimplePlaylistAdapter
} from '@/features/playlist/models/SimplePlaylist.model'

export const simplePlaylistAdapter = (
  playlist: SimplePlaylist
): SimplePlaylistAdapter => ({
  id: playlist.id,
  name: playlist.name
})
