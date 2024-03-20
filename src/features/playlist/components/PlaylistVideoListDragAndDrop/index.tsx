import type { FC } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import type { PlaylistVideoItemAdapter } from '@/features/playlist/models'
import type { PlaylistVideoPosition } from '@/features/playlist/types'
import { useRepositionPlaylistVideo } from '@/features/playlist/hooks'

import { PlaylistDataProps } from '@/features/playlist/components/PlaylistVideoItem/types'

import PlaylistVideoDraggableItem from '@/features/playlist/components/PlaylistVideoDraggableItem'

import Stack from '@mui/material/Stack'

interface Props {
  playlistVideos: PlaylistVideoItemAdapter[]
  playlist: PlaylistDataProps
}

const PlaylistVideoListDragAndDrop: FC<Props> = ({
  playlistVideos,
  playlist
}) => {
  const queryClient = useQueryClient()

  const { mutateRepositionPlaylistVideo } = useRepositionPlaylistVideo()

  const sortPlaylistVideos = (
    sourcePlaylistVideo: PlaylistVideoItemAdapter,
    destinationPosition: PlaylistVideoPosition,
    playlistVideos: PlaylistVideoItemAdapter[]
  ) => {
    if (playlistVideos.length === 2) return playlistVideos.slice().reverse()

    const prevPlaylistVideosFiltered = playlistVideos.filter(
      ({ id }) => id !== sourcePlaylistVideo.id
    )

    return [
      ...prevPlaylistVideosFiltered.slice(0, destinationPosition),
      sourcePlaylistVideo,
      ...prevPlaylistVideosFiltered.slice(destinationPosition)
    ]
  }

  const handleOnDragEnd = (event: DragEndEvent) => {
    if (playlistVideos.length <= 1) return

    const sourcePlaylistVideo = event.active.data.current
      ?.playlistVideo as PlaylistVideoItemAdapter
    const destinationPlaylistVideo = event.over?.data.current
      ?.playlistVideo as PlaylistVideoItemAdapter

    if (sourcePlaylistVideo.id === destinationPlaylistVideo.id) return

    queryClient.setQueryData(
      ['playlistVideos', playlist.id],
      (prevPlaylistVideos: PlaylistVideoItemAdapter[]) =>
        sortPlaylistVideos(
          sourcePlaylistVideo,
          destinationPlaylistVideo.position,
          prevPlaylistVideos
        )
    )

    mutateRepositionPlaylistVideo(
      {
        playlistId: playlist.id,
        newPlaylistVideoPosition: destinationPlaylistVideo.position,
        playlistVideoId: sourcePlaylistVideo.id
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['playlistVideos', playlist.id]
          })

          if (
            sourcePlaylistVideo.position === 0 ||
            destinationPlaylistVideo.position === 0
          )
            queryClient.invalidateQueries({
              queryKey: ['playlistDetails', playlist.id]
            })
        }
      }
    )
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleOnDragEnd}>
      <SortableContext
        items={playlistVideos}
        strategy={verticalListSortingStrategy}
      >
        <Stack flexGrow={1}>
          {playlistVideos.map(playlistVideo => (
            <PlaylistVideoDraggableItem
              key={playlistVideo.id}
              totalVideos={playlistVideos.length}
              playlistVideo={playlistVideo}
              playlist={playlist}
            />
          ))}
        </Stack>
      </SortableContext>
    </DndContext>
  )
}

export default PlaylistVideoListDragAndDrop
