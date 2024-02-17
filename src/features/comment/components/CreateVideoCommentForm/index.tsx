import type { FC } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import type { CommentInputs } from '@/features/comment/models'
import type { VideoCommentsSortBy } from '@/features/comment/types'
import { useCreateVideoComment } from '@/features/comment/hooks'

import type { VideoId } from '@/features/video/types'

import CommentForm from '@/features/comment/components/CommentForm'

interface Props {
  videoId: VideoId
  sortBy: VideoCommentsSortBy
}

const CreateVideoCommentForm: FC<Props> = ({ videoId, sortBy }) => {
  const queryClient = useQueryClient()

  const { mutateCreateComment, isPending } = useCreateVideoComment()

  const handleCreateVideoComment = (data: CommentInputs) => {
    mutateCreateComment(
      {
        videoId,
        commentData: data
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['videoComments', videoId, sortBy]
          })
        }
      }
    )
  }

  return (
    <CommentForm
      onSubmit={handleCreateVideoComment}
      isLoading={isPending}
      buttonText='Comment'
    />
  )
}

export default CreateVideoCommentForm
