import {
  SimplePlaylistList,
  SimplePlaylistListAdapter
} from '@/features/playlist/models/SimplePlaylistList.model'

export const simplePlaylistListAdapter = (
  playlist: SimplePlaylistList
): SimplePlaylistListAdapter => ({
  id: playlist.id,
  name: playlist.name
})
