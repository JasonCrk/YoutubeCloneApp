import { useState, type FC } from 'react'

import { VideoCommentsSortBy } from '@/features/comment/types'
import { useFetchVideoComments } from '@/features/comment/hooks'

import CommentDeleteConfirmationModalProvider from '@/features/comment/contexts/CommentDeleteConfirmationModalContext/Provider'

import type { VideoComments, VideoId } from '@/features/video/types'

import CommentDeleteConfirmationModal from '@/features/comment/components/CommentDeleteConfirmationModal'

import CommentList from '@/features/comment/components/CommentList'
import CommentsSortMenuButton from '@/features/comment/components/CommentsSortMenuButton'
import CreateVideoCommentForm from '@/features/comment/components/CreateVideoCommentForm'

import { Box, Typography } from '@mui/material'

interface Props {
  totalComments: VideoComments
  videoId: VideoId
}

const VideoCommentsSection: FC<Props> = ({ totalComments, videoId }) => {
  const [sortByVideoComments, setSortByVideoComments] =
    useState<VideoCommentsSortBy>(VideoCommentsSortBy.TOP_COMMENTS)

  const {
    videoComments,
    isLoading: fetchVideoCommentsIsLoading,
    isSuccess: fetchVideoCommentsIsSuccess,
    isError: fetchVideoCommentsIsError
  } = useFetchVideoComments(videoId, sortByVideoComments)

  return (
    <CommentDeleteConfirmationModalProvider>
      <CommentDeleteConfirmationModal />
      <Box component='section' mt={1.5}>
        <Box display='flex' gap={2} alignItems='center'>
          <Typography variant='h5' fontWeight='bold'>
            {totalComments} Comments
          </Typography>

          <CommentsSortMenuButton
            onSelectSortBy={setSortByVideoComments}
            sortSelected={sortByVideoComments}
          />
        </Box>

        <Box pt={2.5} pb={3.5}>
          <CreateVideoCommentForm
            sortBy={sortByVideoComments}
            videoId={videoId}
          />
        </Box>

        <CommentList
          parentId={videoId}
          isVideoComments={true}
          comments={videoComments}
          isError={fetchVideoCommentsIsError}
          isLoading={fetchVideoCommentsIsLoading}
          isSuccess={fetchVideoCommentsIsSuccess}
        />
      </Box>
    </CommentDeleteConfirmationModalProvider>
  )
}

export default VideoCommentsSection
