import type {
  CommentContent,
  CommentDislikes,
  CommentId,
  CommentLikes,
  CommentPublicationDate,
  CommentWasEdited
} from '@/features/comment/types'

import type {
  SimpleChannel,
  SimpleChannelAdapter
} from '@/features/channel/models'

export interface CommentItem {
  id: CommentId
  channel: SimpleChannel
  content: CommentContent
  publication_date: CommentPublicationDate
  was_edited: CommentWasEdited
  likes: CommentLikes
  dislikes: CommentDislikes
  liked: boolean
  disliked: boolean
  has_comments: boolean
}

export interface CommentItemAdapter {
  id: CommentId
  channel: SimpleChannelAdapter
  content: CommentContent
  publicationDate: Date
  wasEdited: CommentWasEdited
  likes: CommentLikes
  dislikes: CommentDislikes
  liked: boolean
  disliked: boolean
  hasComments: boolean
}
