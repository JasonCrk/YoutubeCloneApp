import type { FC } from 'react'

import type { PlaylistId } from '@/features/playlist/types'
import { useDeletePlaylistModalContext } from '@/features/playlist/hooks'

import MenuItem from '@/components/ui/MenuItem'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

interface Props {
  onCloseMenu: () => void
  playlistId: PlaylistId
}

const DeletePlaylistMenuItem: FC<Props> = ({ onCloseMenu, playlistId }) => {
  const { onOpen } = useDeletePlaylistModalContext()

  return (
    <MenuItem
      startIcon={<DeleteOutlinedIcon />}
      onClick={() => {
        onOpen(playlistId)
        onCloseMenu()
      }}
    >
      Delete playlist
    </MenuItem>
  )
}

export default DeletePlaylistMenuItem
