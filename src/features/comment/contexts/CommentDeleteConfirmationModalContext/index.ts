import { createContext } from 'react'

import type { CommentId } from '@/features/comment/types'
import type { VideoId } from '@/features/video/types'

export type ParentId = CommentId | VideoId

export interface CommentDeleteConfirmationModalContext {
  isOpen: boolean
  onClose: () => void
  onOpen: (
    parentId: ParentId,
    commentId: CommentId,
    isVideoComment?: boolean
  ) => void
  commentIdToDelete: CommentId | null
  commentParentId: ParentId | null
  isVideoComment: boolean
}

export const commentDeleteConfirmationModalContext =
  createContext<CommentDeleteConfirmationModalContext>({
    commentIdToDelete: null,
    commentParentId: null,
    isOpen: false,
    isVideoComment: false,
    onClose: () => {},
    onOpen: () => {}
  })
