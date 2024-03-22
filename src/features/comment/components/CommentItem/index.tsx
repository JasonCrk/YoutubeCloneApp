import { useState, type FC, useMemo } from 'react'

import { Link } from 'react-router-dom'

import { useAppSelector } from '@/store/hooks'

import type { CommentItemAdapter } from '@/features/comment/models'
import type { CommentId } from '@/features/comment/types'
import { useFetchCommentsOfComment } from '@/features/comment/hooks'

import type { VideoId } from '@/features/video/types'

import Picture from '@/components/ui/Picture'
import Button from '@/components/ui/Button'

import LikeAndDislikeCommentButtons from '@/features/comment/components/LikeAndDislikeCommentButtons'
import CommentOptionsMenuButton from '@/features/comment/components/CommentOptionsMenuButton'
import CreateCommentForCommentForm from '@/features/comment/components/CreateCommentForCommentForm'
import UpdateCommentForm from '@/features/comment/components/UpdateCommentForm'
import CommentList from '@/features/comment/components/CommentList'

import { Box, Stack, Typography } from '@mui/material'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import { getTimeAgo } from '@/utils/datetimeFormats'

interface Props extends CommentItemAdapter {
  parentId: VideoId | CommentId
  isVideoComment: boolean
}

const CommentItem: FC<Props> = ({ isVideoComment, parentId, ...comment }) => {
  const { user, isAuth } = useAppSelector(state => state.auth)

  const [openCommentForm, setOpenCommentForm] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const {
    comments,
    error,
    isError: fetchCommentsIsError,
    isSuccess: fetchCommentsIsSuccess,
    isLoading: fetchCommentsIsLoading
  } = useFetchCommentsOfComment(comment.id, { enabled: showComments })

  const timeAgoPublicationDate = useMemo(
    () => getTimeAgo(comment.publicationDate),
    [comment.publicationDate]
  )

  const isOwnComment = user?.currentChannel.id === comment.channel.id && isAuth
  const channelProfileUrl = '/channel/' + comment.channel.id
  const hasComments = comment.comments > 0

  return (
    <Box display='flex' gap={1.5}>
      <Link
        to={channelProfileUrl}
        style={{ textDecoration: 'none', height: 'fit-content' }}
      >
        <Picture name={comment.channel.name} src={comment.channel.pictureUrl} />
      </Link>

      <Box flexGrow={1}>
        {!isEditing ? (
          <Box
            position='relative'
            sx={{
              '&:hover .commentOptionsMenuButton': {
                visibility: 'visible'
              },
              '&:not(:hover) .commentOptionsMenuButton': {
                visibility: 'hidden'
              }
            }}
          >
            {isOwnComment && (
              <Box
                className='commentOptionsMenuButton'
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  visibility: 'hidden'
                }}
              >
                <CommentOptionsMenuButton
                  commentId={comment.id}
                  setIsEditing={setIsEditing}
                  commentParentId={parentId}
                  isVideoComment={isVideoComment}
                />
              </Box>
            )}
            <Typography
              variant='body2'
              fontSize='0.8rem'
              component={Link}
              to={channelProfileUrl}
              sx={{ textDecoration: 'none' }}
              color='white'
            >
              {comment.channel.handle}
            </Typography>{' '}
            <Typography
              variant='body2'
              component='span'
              color='grey'
              fontSize='0.8rem'
            >
              {timeAgoPublicationDate} {comment.wasEdited && '(edited)'}
            </Typography>
            <Typography variant='body1' component='p'>
              {comment.content}
            </Typography>
            <Stack spacing={1} direction='row' mt={0.5}>
              <LikeAndDislikeCommentButtons
                commentId={comment.id}
                isDisliked={comment.disliked}
                isLiked={comment.liked}
                totalDislikes={comment.dislikes}
                totalLikes={comment.likes}
                parentId={parentId}
                isVideoComment={isVideoComment}
              />

              <Button
                sx={{ fontSize: '0.8rem', py: 0.8, px: 1.8 }}
                onClick={() => setOpenCommentForm(true)}
              >
                Reply
              </Button>
            </Stack>
            {openCommentForm && (
              <Box py={0.5}>
                <CreateCommentForCommentForm
                  hasComments={hasComments}
                  commentParentId={parentId}
                  commentId={comment.id}
                  onCloseForm={() => setOpenCommentForm(false)}
                />
              </Box>
            )}
          </Box>
        ) : (
          <UpdateCommentForm
            isVideoComment={isVideoComment}
            parentId={parentId}
            commentIdToEdit={comment.id}
            onCloseForm={() => setIsEditing(false)}
            updateCommentData={{ content: comment.content }}
          />
        )}

        {hasComments && (
          <Button
            bgcolor='#3ea6ff'
            color='#3ea6ff'
            startIcon={<ArrowDropDownIcon />}
            onClick={() => setShowComments(prevState => !prevState)}
          >
            {comment.comments} Replies
          </Button>
        )}

        {showComments && (
          <CommentList
            error={error}
            comments={comments}
            isError={fetchCommentsIsError}
            isSuccess={fetchCommentsIsSuccess}
            isLoading={fetchCommentsIsLoading}
            parentId={comment.id}
            isVideoComments={false}
          />
        )}
      </Box>
    </Box>
  )
}

export default CommentItem
