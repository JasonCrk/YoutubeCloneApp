import type { FC } from 'react'

import { useMenu } from '@/hooks'

import type { PlaylistVideoItemAdapter } from '@/features/playlist/models'

import OptionsMenuIconButton from '@/components/ui/OptionsMenuButton'

import { PlaylistDataProps } from '@/features/playlist/components/PlaylistVideoItem/types'
import PlaylistVideoOptionsMenu from '@/features/playlist/components/PlaylistVideoOptionsMenu'

export interface PlaylistVideoOptionsMenuButtonProps {
  playlistVideo: PlaylistVideoItemAdapter
  totalVideos: number
  playlist: PlaylistDataProps
}

const PlaylistVideoOptionsMenuButton: FC<
  PlaylistVideoOptionsMenuButtonProps
> = ({ playlistVideo, playlist, totalVideos }) => {
  const { anchorEl, onCloseMenu, onOpenMenu } = useMenu()

  return (
    <>
      <OptionsMenuIconButton onClick={onOpenMenu} />

      <PlaylistVideoOptionsMenu
        anchorEl={anchorEl}
        totalVideos={totalVideos}
        playlistVideo={playlistVideo}
        playlist={playlist}
        onClose={onCloseMenu}
      />
    </>
  )
}

export default PlaylistVideoOptionsMenuButton
