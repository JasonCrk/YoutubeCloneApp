import type { FC } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { useAppSelector } from '@/store/hooks'

import type { VideoDislikes, VideoId, VideoLikes } from '@/features/video/types'
import { useLikeVideo, useDislikeVideo } from '@/features/video/hooks'

import { useAuthModalContext } from '@/features/auth/hooks'

import {
  UiDislikeButton,
  UiLikeButton
} from '@/features/video/components/LikeAndDislikeVideoButtons/ui'

import { ButtonGroup, Typography } from '@mui/material'

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'

interface Props {
  videoId: VideoId
  totalLikes: VideoLikes
  totalDislikes: VideoDislikes
  isLike: boolean
  isDislike: boolean
}

const LikeAndDislikeVideoButtons: FC<Props> = ({
  videoId,
  totalDislikes,
  totalLikes,
  isLike,
  isDislike
}) => {
  const isAuth = useAppSelector(state => state.auth.isAuth)

  const queryClient = useQueryClient()

  const { mutateLikeVideo } = useLikeVideo()
  const { mutateDislikeVideo } = useDislikeVideo()

  const { onOpen: openAuthModal } = useAuthModalContext()

  const handleLikeVideo = () => {
    if (!isAuth) {
      openAuthModal()
      return
    }

    mutateLikeVideo(videoId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['watchVideo', videoId] })
      }
    })
  }

  const handleDislikeVideo = () => {
    if (!isAuth) {
      openAuthModal()
      return
    }

    mutateDislikeVideo(videoId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['watchVideo', videoId] })
      }
    })
  }

  return (
    <ButtonGroup data-testid='LikeAndDislikeVideoButtons'>
      <UiLikeButton
        isActive={isLike}
        title='I like this'
        onClick={handleLikeVideo}
      >
        {isLike ? (
          <ThumbUpAltIcon data-testid='likeIconActivate' />
        ) : (
          <ThumbUpOffAltIcon data-testid='likeIconNotActivate' />
        )}

        <Typography component='span' variant='body2'>
          {totalLikes}
        </Typography>
      </UiLikeButton>

      <UiDislikeButton
        isActive={isDislike}
        title='I dislike this'
        onClick={handleDislikeVideo}
      >
        {isDislike ? (
          <ThumbDownAltIcon data-testid='dislikeIconActivate' />
        ) : (
          <ThumbDownOffAltIcon data-testid='dislikeIconNotActivate' />
        )}

        <Typography component='span' variant='body2'>
          {totalDislikes}
        </Typography>
      </UiDislikeButton>
    </ButtonGroup>
  )
}

export default LikeAndDislikeVideoButtons
