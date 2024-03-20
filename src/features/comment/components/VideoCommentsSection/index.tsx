import { useState, type FC } from 'react'

import { useLazyLoad } from '@/hooks'

import { VideoCommentsSortBy } from '@/features/comment/types'

import CommentDeleteConfirmationModalProvider from '@/features/comment/contexts/CommentDeleteConfirmationModalContext/Provider'

import type { VideoComments, VideoId } from '@/features/video/types'

import CommentDeleteConfirmationModal from '@/features/comment/components/CommentDeleteConfirmationModal'

import CommentList from '@/features/comment/components/CommentList'
import CommentsSortMenuButton from '@/features/comment/components/CommentsSortMenuButton'
import CreateVideoCommentForm from '@/features/comment/components/CreateVideoCommentForm'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface Props {
  totalComments: VideoComments
  videoId: VideoId
}

const VideoCommentsSection: FC<Props> = ({ totalComments, videoId }) => {
  const [sortByVideoComments, setSortByVideoComments] =
    useState<VideoCommentsSortBy>(VideoCommentsSortBy.TOP_COMMENTS)

  const [ref, isVisible] = useLazyLoad()

  return (
    <div ref={ref}>
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

          {isVisible && (
            <>
              <Box pt={2.5} pb={3.5}>
                <CreateVideoCommentForm
                  sortBy={sortByVideoComments}
                  videoId={videoId}
                />
              </Box>

              <CommentList
                sortByVideoComments={sortByVideoComments}
                parentId={videoId}
                isVideoComments={true}
              />
            </>
          )}
        </Box>
      </CommentDeleteConfirmationModalProvider>
    </div>
  )
}

export default VideoCommentsSection
