import type { FC } from 'react'

import type { PlaylistVideoItemAdapter } from '@/features/playlist/models'

import { PlaylistDataProps } from '@/features/playlist/components/PlaylistVideoItem/types'
import PlaylistVideoItemWrapper from '@/features/playlist/components/PlaylistVideoItemWrapper'
import PlaylistVideoContent from '@/features/playlist/components/PlaylistVideoContent'

import Typography from '@mui/material/Typography'
import grey from '@mui/material/colors/grey'

interface Props {
  playlistVideo: PlaylistVideoItemAdapter
  totalVideos: number
  playlist: PlaylistDataProps
}

const PlaylistVideoItem: FC<Props> = ({
  playlist,
  totalVideos,
  playlistVideo
}) => {
  return (
    <PlaylistVideoItemWrapper
      totalVideos={totalVideos}
      playlist={playlist}
      playlistVideo={playlistVideo}
    >
      <Typography
        width='35.2px'
        component='span'
        variant='body2'
        color={grey[500]}
        fontWeight='bold'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        {playlistVideo.position + 1}
      </Typography>

      <PlaylistVideoContent {...playlistVideo} playlistId={playlist.id} />
    </PlaylistVideoItemWrapper>
  )
}

export default PlaylistVideoItem
