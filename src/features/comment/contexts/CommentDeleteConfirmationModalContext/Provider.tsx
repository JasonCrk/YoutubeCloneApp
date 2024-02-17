import { useState, type FC, type ReactNode } from 'react'

import type { CommentId } from '@/features/comment/types'

import {
  type ParentId,
  commentDeleteConfirmationModalContext
} from '@/features/comment/contexts/CommentDeleteConfirmationModalContext'

interface Props {
  children: ReactNode
}

const CommentDeleteConfirmationModalProvider: FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVideoComment, setIsVideoComment] = useState(false)
  const [commentParentId, setCommentParentId] = useState<ParentId | null>(null)
  const [commentIdToDelete, setCommentIdToDelete] = useState<CommentId | null>(
    null
  )

  const onOpen = (
    parentId: ParentId,
    commentId: CommentId,
    isVideoComment?: boolean
  ) => {
    setCommentIdToDelete(commentId)
    setCommentParentId(parentId)
    setIsVideoComment(Boolean(isVideoComment))
    setIsOpen(true)
  }

  const onClose = () => {
    setCommentIdToDelete(null)
    setCommentParentId(null)
    setIsOpen(false)
  }

  return (
    <commentDeleteConfirmationModalContext.Provider
      value={{
        isOpen,
        isVideoComment,
        commentIdToDelete,
        commentParentId,
        onClose,
        onOpen
      }}
    >
      {children}
    </commentDeleteConfirmationModalContext.Provider>
  )
}

export default CommentDeleteConfirmationModalProvider
