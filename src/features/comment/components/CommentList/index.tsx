import type { FC } from 'react'

import type { CommentItemAdapter } from '@/features/comment/models'
import type { VideoId } from '@/features/video/types'

import CommentItem from '@/features/comment/components/CommentItem'

import { Box, CircularProgress, Stack, Typography } from '@mui/material'

interface Props {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  comments: CommentItemAdapter[] | undefined
  parentId: VideoId
  isVideoComments?: boolean
}

const CommentList: FC<Props> = ({
  comments,
  isError,
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

  if (isError)
    return (
      <Box display='flex' justifyContent='center'>
        <Typography>Ha ocurrido un error</Typography>
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
