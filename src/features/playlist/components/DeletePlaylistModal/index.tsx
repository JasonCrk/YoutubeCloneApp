import type { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import {
  useDeletePlaylist,
  useDeletePlaylistModalContext
} from '@/features/playlist/hooks'

import Button from '@/components/ui/Button'

import { Box, Modal, Stack, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'

const DeletePlaylistModal: FC = () => {
  const { isOpen, onClose, playlistId } = useDeletePlaylistModalContext()

  const navigate = useNavigate()

  const { mutateDeletePlaylist, isPending } = useDeletePlaylist()

  const handleCloseModal = () => {
    if (isPending) return
    onClose()
  }

  const handleDeletePlaylist = () => {
    if (playlistId && isOpen && !isPending)
      mutateDeletePlaylist(playlistId, {
        onSuccess: () => {
          navigate('/feed/you')
        }
      })
  }

  return (
    <Modal open={isOpen} onClose={handleCloseModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          px: 3,
          pt: 2.5,
          pb: 2,
          bgcolor: 'background.paper',
          borderRadius: 2
        }}
      >
        <Box
          width='450px'
          color='white'
          display='flex'
          flexDirection='column'
          rowGap={1.5}
        >
          <Typography component='h3' variant='subtitle1'>
            Delete playlist
          </Typography>

          <Typography component='p' variant='body2' color={grey[500]}>
            Are you sure you want to delete Database? <br />
            Note: Deleting playlists is a permanent action and cannot be undone.
          </Typography>

          <Stack direction='row' spacing={1} justifyContent='end'>
            <Button onClick={handleCloseModal} disabled={isPending}>
              Cancel
            </Button>
            <Button
              onClick={handleDeletePlaylist}
              bgcolor={blue[600]}
              color={blue[600]}
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

export default DeletePlaylistModal
