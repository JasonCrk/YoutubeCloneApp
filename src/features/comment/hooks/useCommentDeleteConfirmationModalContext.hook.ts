import { useContext } from 'react'

import {
  type CommentDeleteConfirmationModalContext,
  commentDeleteConfirmationModalContext
} from '@/features/comment/contexts/CommentDeleteConfirmationModalContext'

export const useCommentDeleteConfirmationModalContext =
  (): CommentDeleteConfirmationModalContext => {
    const contextResult = useContext(commentDeleteConfirmationModalContext)

    if (!contextResult)
      throw new Error(
        'The component is not found within the CommentDeleteConfirmationModalContext context'
      )

    return contextResult
  }
