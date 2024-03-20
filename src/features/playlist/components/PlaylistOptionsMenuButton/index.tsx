import type { FC } from 'react'

import { useMenu } from '@/hooks'

import type { PlaylistId } from '@/features/playlist/types'
import type { ChannelId } from '@/features/channel/types'

import OptionsMenuIconButton from '@/components/ui/OptionsMenuButton'

import PlaylistOptionsMenu from '@/features/playlist/components/PlaylistOptionsMenu'

import { grey } from '@mui/material/colors'

interface Props {
  playlist: {
    id: PlaylistId
    channelId: ChannelId
  }
}

const PlaylistOptionsMenuButton: FC<Props> = ({ playlist }) => {
  const { anchorEl, onCloseMenu, onOpenMenu } = useMenu()

  return (
    <>
      <OptionsMenuIconButton
        onClick={onOpenMenu}
        sx={{
          backgroundColor: grey[800],
          '&:hover': { backgroundColor: grey[700] }
        }}
      />

      <PlaylistOptionsMenu
        anchorEl={anchorEl}
        onClose={onCloseMenu}
        playlist={playlist}
      />
    </>
  )
}

export default PlaylistOptionsMenuButton
