import type { ListResponse, MessageResponse } from '@/models/responses'

import type { CommentItem, CommentInputs } from '@/features/comment/models'
import type { CommentId } from '@/features/comment/types'

import type { VideoId } from '@/features/video/types'

import {
  optionalAuthCommentEndpoint,
  protectedCommentEndpoint
} from '@/features/comment/services'
import { VideoCommentsSortBy } from '@/features/comment/types/VideoCommentsParams'

export const retrieveVideoCommentsService = async ({
  videoId,
  params
}: {
  videoId: VideoId
  params?: { sortBy: VideoCommentsSortBy }
}): Promise<ListResponse<CommentItem>> => {
  const response = await optionalAuthCommentEndpoint.get<
    ListResponse<CommentItem>
  >(`/video/${videoId}/`, {
    params
  })
  return response.data
}

export const retrieveCommentsOfCommentService = async (
  commentId: CommentId
): Promise<ListResponse<CommentItem>> => {
  const response = await optionalAuthCommentEndpoint.get<
    ListResponse<CommentItem>
  >(`/comment/${commentId}/`)
  return response.data
}

export const createVideoCommentService = async ({
  videoId,
  commentData
}: {
  videoId: VideoId
  commentData: CommentInputs
}): Promise<MessageResponse> => {
  const response = await protectedCommentEndpoint.post<MessageResponse>(
    `/video/${videoId}/create/`,
    commentData
  )
  return response.data
}

export const createCommentForCommentService = async ({
  commentId,
  commentData
}: {
  commentId: CommentId
  commentData: CommentInputs
}): Promise<MessageResponse> => {
  const response = await protectedCommentEndpoint.post<MessageResponse>(
    `/comment/${commentId}/create/`,
    commentData
  )
  return response.data
}

export const likeCommentService = async (
  commentId: CommentId
): Promise<MessageResponse> => {
  const response = await protectedCommentEndpoint.post<MessageResponse>(
    `/${commentId}/like/`
  )
  return response.data
}

export const dislikeCommentService = async (commentId: CommentId) => {
  const response = await protectedCommentEndpoint.post<MessageResponse>(
    `/${commentId}/dislike/`
  )
  return response.data
}

export const updateCommentService = async ({
  commentId,
  commentData
}: {
  commentId: CommentId
  commentData: CommentInputs
}): Promise<MessageResponse> => {
  const response = await protectedCommentEndpoint.put<MessageResponse>(
    `/${commentId}/edit/`,
    commentData
  )
  return response.data
}

export const deleteCommentService = async (
  commentId: CommentId
): Promise<MessageResponse> => {
  const response = await protectedCommentEndpoint.delete<MessageResponse>(
    `/${commentId}/delete/`
  )
  return response.data
}
