import type { FC } from 'react'

import { useAppSelector } from '@/store/hooks'

import type { VideoId } from '@/features/video/types'
import { useSaveVideoToPlaylistsContext } from '@/features/playlist/hooks'

import { useAuthModalContext } from '@/features/auth/hooks'

import Button from '@/components/ui/Button'

import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'

import { grey } from '@mui/material/colors'

interface Props {
  videoId: VideoId
}

const SaveVideoToPlaylistButton: FC<Props> = ({ videoId }) => {
  const isAuth = useAppSelector(state => state.auth.isAuth)

  const { onOpen: onOpenSaveVideoToPlaylist } = useSaveVideoToPlaylistsContext()
  const { onOpen: onOpenAuthModal } = useAuthModalContext()

  const handleOpenModal = () => {
    if (!isAuth) {
      onOpenAuthModal()
      return
    }

    onOpenSaveVideoToPlaylist(videoId)
  }

  return (
    <Button
      variant='solid'
      bgcolor={grey[900]}
      startIcon={<PlaylistAddIcon />}
      sx={{ gap: 0.5, p: '6px 13px' }}
      onClick={handleOpenModal}
    >
      Save
    </Button>
  )
}

export default SaveVideoToPlaylistButton
