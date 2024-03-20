import type { ListResponse, MessageResponse } from '@/models/responses'

import type {
  CreatePlaylistInputs,
  PlaylistItem,
  PlaylistItemToSaveVideo,
  SimplePlaylist,
  PlaylistDetails,
  PlaylistVideoItem,
  UpdatePlaylistInputs
} from '@/features/playlist/models'
import type {
  PlaylistId,
  PlaylistVideoId,
  PlaylistVideoPosition
} from '@/features/playlist/types'
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

export const retrievePlaylistDetailsService = async (
  playlistId: PlaylistId
): Promise<PlaylistDetails> => {
  const response = await optionalAuthPlaylistEndpoint.get<PlaylistDetails>(
    `/${playlistId}/`
  )
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

export const retrievePlaylistVideosService = async (
  playlistId: PlaylistId
): Promise<ListResponse<PlaylistVideoItem>> => {
  const response = await optionalAuthPlaylistEndpoint.get<
    ListResponse<PlaylistVideoItem>
  >(`/${playlistId}/videos/`)
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

export const repositionPlaylistVideoService = async ({
  playlistId,
  playlistVideoId,
  newPlaylistVideoPosition
}: {
  playlistId: PlaylistId
  playlistVideoId: PlaylistVideoId
  newPlaylistVideoPosition: PlaylistVideoPosition
}) => {
  await protectedPlaylistEndpoint.post(
    `/${playlistId}/playlist-video/${playlistVideoId}/reposition/`,
    { new_position: newPlaylistVideoPosition }
  )
}

export const updatePlaylistService = async ({
  playlistId,
  data
}: {
  playlistId: PlaylistId
  data: UpdatePlaylistInputs
}): Promise<MessageResponse> => {
  const response = await protectedPlaylistEndpoint.patch<MessageResponse>(
    `/${playlistId}/edit/`,
    data
  )
  return response.data
}

export const removeVideoFromPlaylistService = async ({
  playlistId,
  videoId
}: {
  playlistId: PlaylistId
  videoId: VideoId
}): Promise<MessageResponse> => {
  const response = await protectedPlaylistEndpoint.delete<MessageResponse>(
    `/${playlistId}/video/${videoId}/remove/`
  )
  return response.data
}

export const deletePlaylistService = async (playlistId: PlaylistId) => {
  const response = await protectedPlaylistEndpoint.delete<MessageResponse>(
    `/${playlistId}/delete/`
  )
  return response.data
}
