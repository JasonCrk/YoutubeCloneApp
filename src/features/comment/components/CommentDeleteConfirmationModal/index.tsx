import type { FC } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import Button from '@/components/ui/Button'

import {
  useCommentDeleteConfirmationModalContext,
  useDeleteComment
} from '@/features/comment/hooks'

import { Box, Modal, Stack, Typography } from '@mui/material'

const CommentDeleteConfirmationModal: FC = () => {
  const {
    commentIdToDelete,
    commentParentId,
    isVideoComment,
    onClose,
    isOpen
  } = useCommentDeleteConfirmationModalContext()

  const queryClient = useQueryClient()

  const { mutateDeleteComment, isPending } = useDeleteComment()

  const handleDeleteComment = () => {
    if (commentIdToDelete !== null && commentParentId !== null)
      mutateDeleteComment(commentIdToDelete, {
        onSuccess: () => {
          const queryKey = isVideoComment
            ? ['videoComments', commentParentId]
            : ['commentsOfComment', commentParentId]

          queryClient.invalidateQueries({ queryKey })
          onClose()
        }
      })
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          p: 3,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2
        }}
      >
        <Box
          width='420px'
          color='white'
          display='flex'
          flexDirection='column'
          gap={2}
        >
          <Typography variant='subtitle1'>Delete comment</Typography>

          <Typography variant='body1' color='grey'>
            Delete your comment and all of its replies permanently?
          </Typography>

          <Stack alignSelf='end' spacing={1} direction='row'>
            <Button bgcolor='#3ea6ff' color='#3ea6ff' onClick={onClose}>
              Cancel
            </Button>
            <Button
              bgcolor='#3ea6ff'
              color='#3ea6ff'
              onClick={handleDeleteComment}
              disabled={isPending}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  )
}

export default CommentDeleteConfirmationModal
