import { type FC } from 'react'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import type { PlaylistVideoItemAdapter } from '@/features/playlist/models'

import { PlaylistDataProps } from '@/features/playlist/components/PlaylistVideoItem/types'

import PlaylistVideoContent from '@/features/playlist/components/PlaylistVideoContent'
import PlaylistVideoItemWrapper from '@/features/playlist/components/PlaylistVideoItemWrapper'

import Box from '@mui/material/Box'
import grey from '@mui/material/colors/grey'

import DragHandleIcon from '@mui/icons-material/DragHandle'

interface Props {
  totalVideos: number
  playlistVideo: PlaylistVideoItemAdapter
  playlist: PlaylistDataProps
}

const PlaylistVideoDraggableItem: FC<Props> = ({
  playlistVideo,
  totalVideos,
  playlist
}) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: playlistVideo.id,
    data: {
      playlistVideo
    }
  })

  const dragAndDropAnimation = {
    transform: CSS.Transform.toString(transform)
  }

  return (
    <PlaylistVideoItemWrapper
      {...attributes}
      totalVideos={totalVideos}
      ref={setNodeRef}
      style={dragAndDropAnimation}
      playlistVideo={playlistVideo}
      playlist={playlist}
    >
      <Box
        color={grey[500]}
        px={0.7}
        display='flex'
        alignItems='center'
        sx={{ cursor: 'grab' }}
        {...listeners}
      >
        <DragHandleIcon />
      </Box>

      <PlaylistVideoContent {...playlistVideo} playlistId={playlist.id} />
    </PlaylistVideoItemWrapper>
  )
}

export default PlaylistVideoDraggableItem
