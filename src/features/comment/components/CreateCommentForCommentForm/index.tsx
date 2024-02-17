import type { FC } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import type { CommentInputs } from '@/features/comment/models'
import type { CommentId } from '@/features/comment/types'
import { useCreateCommentForComment } from '@/features/comment/hooks'

import CommentForm from '@/features/comment/components/CommentForm'

interface Props {
  commentId: CommentId
  onCloseForm: () => void
  hasComments: boolean
  commentParentId: CommentId
}

const CreateCommentForCommentForm: FC<Props> = ({
  commentId,
  hasComments,
  commentParentId,
  onCloseForm
}) => {
  const queryClient = useQueryClient()

  const { mutateCreateCommentForComment, isPending } =
    useCreateCommentForComment()

  const handleCreateCommentForComment = (commentData: CommentInputs) => {
    mutateCreateCommentForComment(
      {
        commentId: commentId,
        commentData
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [
              'commentsOfComment',
              hasComments ? commentId : commentParentId
            ]
          })
          onCloseForm()
        }
      }
    )
  }

  return (
    <CommentForm
      buttonText='Reply'
      isLoading={isPending}
      onSubmit={handleCreateCommentForComment}
      onCloseForm={onCloseForm}
      autoFocus
    />
  )
}

export default CreateCommentForCommentForm
