import type { FC } from 'react'

import { VideoCommentsSortBy } from '@/features/comment/types'
import { useFetchVideoComments } from '@/features/comment/hooks'

import type { VideoId } from '@/features/video/types'

import CommentItem from '@/features/comment/components/CommentItem'

import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { red } from '@mui/material/colors'

interface Props {
  parentId: VideoId
  isVideoComments?: boolean
  sortByVideoComments: VideoCommentsSortBy
}

const CommentList: FC<Props> = ({
  parentId,
  isVideoComments,
  sortByVideoComments
}) => {
  const { videoComments, isLoading, isSuccess, isError, error } =
    useFetchVideoComments(parentId, sortByVideoComments)

  if (isLoading)
    return (
      <Box display='flex' justifyContent='center'>
        <CircularProgress />
      </Box>
    )

  if (isError)
    return (
      <Box width='100%'>
        <Typography textAlign='center' color={red[600]}>
          {error.message}
        </Typography>
      </Box>
    )

  if (isSuccess && videoComments)
    return (
      <Stack spacing={1.5}>
        {videoComments.map(comment => (
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
