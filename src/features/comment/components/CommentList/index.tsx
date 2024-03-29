import type { FC } from 'react'

import type { MessageResponse } from '@/models/responses'

import type { CommentItemAdapter } from '@/features/comment/models'

import type { VideoId } from '@/features/video/types'

import CommentItem from '@/features/comment/components/CommentItem'

import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { red } from '@mui/material/colors'

interface Props {
  parentId: VideoId
  comments: CommentItemAdapter[] | undefined
  error: MessageResponse | null
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  isVideoComments?: boolean
}

const CommentList: FC<Props> = ({
  comments,
  isError,
  error,
  isLoading,
  isSuccess,
  parentId,
  isVideoComments
}) => {
  if (isLoading)
    return (
      <Box display='flex' justifyContent='center'>
        <CircularProgress />
      </Box>
    )

  if (isError && error)
    return (
      <Box width='100%'>
        <Typography textAlign='center' color={red[600]}>
          {error.message}
        </Typography>
      </Box>
    )

  if (isSuccess && comments)
    return (
      <Stack spacing={1.5}>
        {comments.map(comment => (
          <CommentItem
            key={comment.id}
            isVideoComment={Boolean(isVideoComments)}
            parentId={parentId}
            {...comment}
          />
        ))}
      </Stack>
    )
}

export default CommentList
