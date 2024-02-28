import type {
  PlaylistItemToSaveVideo,
  PlaylistItemToSaveVideoAdapter
} from '@/features/playlist/models'

export const playlistItemToSaveVideoAdapter = (
  playlist: PlaylistItemToSaveVideo
): PlaylistItemToSaveVideoAdapter => ({
  id: playlist.id,
  isVideoSaved: playlist.video_is_saved,
  name: playlist.name,
  visibility: playlist.visibility
})
