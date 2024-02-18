import type { CommentItem, CommentItemAdapter } from '@/features/comment/models'

import { simpleChannelAdapter } from '@/features/channel/adapters'

export const commentItemAdapter = (
  comment: CommentItem
): CommentItemAdapter => ({
  channel: simpleChannelAdapter(comment.channel),
  content: comment.content,
  disliked: comment.disliked,
  dislikes: comment.dislikes,
  id: comment.id,
  liked: comment.liked,
  likes: comment.likes,
  publicationDate: new Date(comment.publication_date),
  wasEdited: comment.was_edited,
  comments: comment.comments
})
