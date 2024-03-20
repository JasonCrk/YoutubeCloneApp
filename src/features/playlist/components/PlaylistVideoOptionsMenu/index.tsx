import type { FC } from 'react'

import { useAppSelector } from '@/store/hooks'

import type { PlaylistVideoItemAdapter } from '@/features/playlist/models'
import { PlaylistDataProps } from '@/features/playlist/components/PlaylistVideoItem/types'

import MovePlaylistVideoToTop from '@/features/playlist/components/MovePlaylistVideoToTop'
import SaveVideoToPlaylistMenuItem from '@/features/playlist/components/SaveVideoToPlaylistMenuItem'
import MovePlaylistVideoToBottom from '@/features/playlist/components/MovePlaylistVideoToBottom'
import SetPlaylistThumbnailMenuItem from '@/features/playlist/components/SetPlaylistThumbnailMenuItem'
import RemovePlaylistVideoFromPlaylistMenuItem from '@/features/playlist/components/RemovePlaylistVideoFromPlaylistMenuItem'

import Menu from '@mui/material/Menu'
import Divider from '@mui/material/Divider'

interface Props {
  onClose: () => void
  anchorEl: HTMLElement | null
  playlistVideo: PlaylistVideoItemAdapter
  totalVideos: number
  playlist: PlaylistDataProps
}

const PlaylistVideoOptionsMenu: FC<Props> = ({
  onClose,
  anchorEl,
  playlistVideo,
  playlist,
  totalVideos
}) => {
  const user = useAppSelector(state => state.auth.user)

  const isOwner = user?.currentChannel.id === playlist.channelId

  return (
    <Menu
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorEl={anchorEl}
      slotProps={{ paper: { sx: { backgroundColor: 'background.paper' } } }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
    >
      <SaveVideoToPlaylistMenuItem
        onCloseMenu={onClose}
        videoId={playlistVideo.video.id}
      />

      {isOwner && (
        <RemovePlaylistVideoFromPlaylistMenuItem
          onCloseMenu={onClose}
          playlist={{
            id: playlist.id,
            name: playlist.name,
            firstVideoId: playlist.firstVideoId
          }}
          playlistVideo={{
            position: playlistVideo.position,
            videoId: playlistVideo.video.id
          }}
        />
      )}

      {isOwner && <Divider />}

      {isOwner && (
        <MovePlaylistVideoToTop
          onClose={onClose}
          playlistId={playlist.id}
          playlistVideoId={playlistVideo.id}
          playlistVideoPosition={playlistVideo.position}
        />
      )}

      {isOwner && (
        <MovePlaylistVideoToBottom
          onClose={onClose}
          totalVideos={totalVideos}
          playlistId={playlist.id}
          playlistVideoId={playlistVideo.id}
          playlistVideoPosition={playlistVideo.position}
        />
      )}

      {isOwner && (
        <SetPlaylistThumbnailMenuItem
          onClose={onClose}
          playlistId={playlist.id}
          playlistVideoId={playlistVideo.id}
        />
      )}
    </Menu>
  )
}

export default PlaylistVideoOptionsMenu
