import type { FC } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import type { CommentInputs } from '@/features/comment/models'
import type { CommentId } from '@/features/comment/types'
import { useUpdateComment } from '@/features/comment/hooks'

import type { VideoId } from '@/features/video/types'

import CommentForm from '@/features/comment/components/CommentForm'

interface Props {
  parentId: CommentId | VideoId
  commentIdToEdit: CommentId
  updateCommentData: CommentInputs
  onCloseForm: () => void
  isVideoComment: boolean
}

const UpdateCommentForm: FC<Props> = ({
  onCloseForm,
  parentId,
  isVideoComment,
  commentIdToEdit,
  updateCommentData
}) => {
  const queryClient = useQueryClient()

  const { mutateUpdateComment, isPending } = useUpdateComment()

  const handleUpdateCommentSubmit = (data: CommentInputs) => {
    mutateUpdateComment(
      {
        commentData: data,
        commentId: commentIdToEdit
      },
      {
        onSuccess: () => {
          const queryKey = isVideoComment
            ? ['videoComments', parentId]
            : ['commentsOfComment', parentId]

          queryClient.invalidateQueries({ queryKey })
          onCloseForm()
        }
      }
    )
  }

  return (
    <CommentForm
      buttonText='Save'
      isLoading={isPending}
      onSubmit={handleUpdateCommentSubmit}
      onCloseForm={onCloseForm}
      defaultCommentData={updateCommentData}
      disablePicture
      autoFocus
    />
  )
}

export default UpdateCommentForm
