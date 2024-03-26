import { useState, type FC } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import type { SimplePlaylistListAdapter } from '@/features/playlist/models'
import {
  useSaveVideoToPlaylist,
  useSaveVideoToPlaylistsContext
} from '@/features/playlist/hooks'

import ListItemTextCustom from '@/components/ui/ListItemTextCustom'

import PlaylistCheckboxList from '@/features/playlist/components/PlaylistCheckboxList'
import CreatePlaylistForm from '@/features/playlist/components/CreatePlaylistForm'

import {
  Box,
  IconButton,
  ListItem,
  ListItemIcon,
  Modal,
  Typography
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'

const SaveVideoToPlaylistsModal: FC = () => {
  const queryClient = useQueryClient()

  const { onClose, isOpen, selectedVideoId } = useSaveVideoToPlaylistsContext()

  const [showCreatePlaylistForm, setShowCreatePlaylistForm] = useState(false)

  const { mutateSaveVideoToPlaylist } = useSaveVideoToPlaylist()

  const handleSaveVideoToPlaylist = (playlist: SimplePlaylistListAdapter) => {
    if (selectedVideoId)
      mutateSaveVideoToPlaylist(
        {
          playlistId: playlist.id,
          videoId: selectedVideoId
        },
        {
          onSuccess: () => {
            onClose()
            queryClient.invalidateQueries({
              queryKey: ['ownPlaylistsToSaveVideo', selectedVideoId]
            })
          }
        }
      )
  }

  return (
    <Modal open={isOpen && selectedVideoId !== null} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2
        }}
      >
        <Box width='230px' color='white' display='flex' flexDirection='column'>
          <Box pt={1.5} pl={2.8} pr={2.2}>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Typography>Save video to...</Typography>

              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            {selectedVideoId && (
              <PlaylistCheckboxList videoId={selectedVideoId} />
            )}
          </Box>

          {!showCreatePlaylistForm ? (
            <ListItem
              onClick={() => setShowCreatePlaylistForm(true)}
              sx={{
                cursor: 'pointer',
                display: 'flex',
                gap: 1.6,
                px: 3,
                py: 1.5
              }}
            >
              <ListItemIcon sx={{ minWidth: 'fit-content' }}>
                <AddIcon />
              </ListItemIcon>
              <ListItemTextCustom content='Create new playlist' />
            </ListItem>
          ) : (
            <CreatePlaylistForm
              onSuccessfulCreatePlaylist={handleSaveVideoToPlaylist}
            />
          )}
        </Box>
      </Box>
    </Modal>
  )
}

export default SaveVideoToPlaylistsModal
