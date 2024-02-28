import type { ListResponse, MessageResponse } from '@/models/responses'

import type {
  CreatePlaylistInputs,
  PlaylistItem,
  PlaylistItemToSaveVideo,
  SimplePlaylist
} from '@/features/playlist/models'
import type { PlaylistId } from '@/features/playlist/types'
import {
  optionalAuthPlaylistEndpoint,
  protectedPlaylistEndpoint
} from '@/features/playlist/services'

import type { VideoId } from '@/features/video/types'
import type { ChannelId } from '@/features/channel/types'

export const retrieveOwnPlaylistsService = async (): Promise<
  ListResponse<SimplePlaylist>
> => {
  const response =
    await protectedPlaylistEndpoint.get<ListResponse<SimplePlaylist>>('/own/')
  return response.data
}

export const retrieveOwnPlaylistsToSaveVideoService = async (
  videoId: VideoId
): Promise<ListResponse<PlaylistItemToSaveVideo>> => {
  const response = await protectedPlaylistEndpoint.get<
    ListResponse<PlaylistItemToSaveVideo>
  >(`/video/${videoId}/video-saved/`)
  return response.data
}

export const retrieveChannelPlaylistsService = async (
  channelId: ChannelId
): Promise<ListResponse<PlaylistItem>> => {
  const response = await optionalAuthPlaylistEndpoint.get<
    ListResponse<PlaylistItem>
  >(`/channel/${channelId}`)
  return response.data
}

export const createPlaylistService = async (
  playlistData: CreatePlaylistInputs
): Promise<SimplePlaylist> => {
  const response = await protectedPlaylistEndpoint.post<SimplePlaylist>(
    '/create/',
    playlistData
  )
  return response.data
}

export const saveVideoToPlaylistService = async ({
  playlistId,
  videoId
}: {
  playlistId: PlaylistId
  videoId: VideoId
}): Promise<MessageResponse> => {
  const response = await protectedPlaylistEndpoint.post<MessageResponse>(
    `/${playlistId}/save-video/`,
    { video_id: videoId }
  )
  return response.data
}

export const removeVideoFromPlaylistService = async ({
  playlistId,
  videoId
}: {
  playlistId: PlaylistId,
  videoId: VideoId
}): Promise<MessageResponse> => {
  const response = await protectedPlaylistEndpoint.delete<MessageResponse>(
    `/${playlistId}/video/${videoId}/remove/`
  )
  return response.data
}
