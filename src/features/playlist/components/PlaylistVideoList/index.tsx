import type { FC } from 'react'

import type { PlaylistVideoItemAdapter } from '@/features/playlist/models'

import { PlaylistDataProps } from '@/features/playlist/components/PlaylistVideoItem/types'
import PlaylistVideoItem from '@/features/playlist/components/PlaylistVideoItem'

import { Stack } from '@mui/material'

interface Props {
  playlistVideos: PlaylistVideoItemAdapter[]
  playlist: PlaylistDataProps
}

const PlaylistVideoList: FC<Props> = ({ playlist, playlistVideos }) => {
  return (
    <Stack flexGrow={1}>
      {playlistVideos.map(playlistVideo => (
        <PlaylistVideoItem
          totalVideos={playlistVideos.length}
          key={playlistVideo.id}
          playlistVideo={playlistVideo}
          playlist={playlist}
        />
      ))}
    </Stack>
  )
}

export default PlaylistVideoList
