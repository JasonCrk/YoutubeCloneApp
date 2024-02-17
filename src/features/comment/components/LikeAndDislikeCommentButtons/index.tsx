import type { FC } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import toast from 'react-hot-toast'

import { useAppSelector } from '@/store/hooks'

import type {
  CommentDislikes,
  CommentId,
  CommentLikes
} from '@/features/comment/types'
import { useLikeComment, useDislikeComment } from '@/features/comment/hooks'

import { useAuthModalContext } from '@/features/auth/hooks'

import type { VideoId } from '@/features/video/types'

import { Box, IconButton, Stack, Typography } from '@mui/material'

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'

interface Props {
  commentId: CommentId
  totalLikes: CommentLikes
  totalDislikes: CommentDislikes
  isLiked: boolean
  isDisliked: boolean
  isVideoComment: boolean
  parentId: VideoId | CommentId
}

const LikeAndDislikeCommentButtons: FC<Props> = ({
  commentId,
  isDisliked,
  isLiked,
  totalDislikes,
  totalLikes,
  isVideoComment,
  parentId
}) => {
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const { onOpen: onOpenAuthModal } = useAuthModalContext()

  const { mutateLikeComment } = useLikeComment()
  const { mutateDislikeComment } = useDislikeComment()

  const queryClient = useQueryClient()

  const handleSuccess = () => {
    const queryKey = isVideoComment
      ? ['videoComments', parentId]
      : ['commentsOfComment', parentId]

    queryClient.invalidateQueries({ queryKey })
  }

  const handleLikeComment = () => {
    if (!isAuth) {
      onOpenAuthModal()
      return
    }

    mutateLikeComment(commentId, {
      onSuccess: handleSuccess,
      onError: () => {
        toast.error(
          'An error occurred while trying to like the comment, please re-enter it later',
          {
            position: 'bottom-left',
            duration: 1500
          }
        )
      }
    })
  }

  const handleDislikeComment = () => {
    if (!isAuth) {
      onOpenAuthModal()
      return
    }

    mutateDislikeComment(commentId, {
      onSuccess: handleSuccess,
      onError: () => {
        toast.error(
          'An error occurred while trying to dislike the comment, please re-enter it later',
          {
            position: 'bottom-left',
            duration: 1500
          }
        )
      }
    })
  }

  return (
    <Stack spacing={1} direction='row'>
      <Box display='flex' alignItems='center'>
        <IconButton onClick={handleLikeComment}>
          {isLiked ? (
            <ThumbUpAltIcon fontSize='small' />
          ) : (
            <ThumbUpOffAltIcon fontSize='small' />
          )}
        </IconButton>
        <Typography component='span'>{totalLikes}</Typography>
      </Box>
      <Box>
        <IconButton onClick={handleDislikeComment}>
          {isDisliked ? (
            <ThumbDownAltIcon fontSize='small' />
          ) : (
            <ThumbDownOffAltIcon fontSize='small' />
          )}
        </IconButton>
        <Typography component='span'>{totalDislikes}</Typography>
      </Box>
    </Stack>
  )
}

export default LikeAndDislikeCommentButtons
