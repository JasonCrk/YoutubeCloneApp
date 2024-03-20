import type { FC } from 'react'

import { useAppSelector } from '@/store/hooks'

import type { PlaylistId } from '@/features/playlist/types'
import type { ChannelId } from '@/features/channel/types'

import DeletePlaylistMenuItem from '@/features/playlist/components/DeletePlaylistMenuItem'

import { Menu } from '@mui/material'

interface Props {
  anchorEl: HTMLElement | null
  onClose: () => void
  playlist: {
    id: PlaylistId
    channelId: ChannelId
  }
}

const PlaylistOptionsMenu: FC<Props> = ({ anchorEl, onClose, playlist }) => {
  const user = useAppSelector(state => state.auth.user)

  const isOwner = user?.currentChannel.id === playlist.channelId

  if (!isOwner) return null

  return (
    <Menu
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorEl={anchorEl}
      slotProps={{
        paper: { sx: { backgroundColor: 'background.paper', mt: 1 } }
      }}
    >
      <DeletePlaylistMenuItem onCloseMenu={onClose} playlistId={playlist.id} />
    </Menu>
  )
}

export default PlaylistOptionsMenu
