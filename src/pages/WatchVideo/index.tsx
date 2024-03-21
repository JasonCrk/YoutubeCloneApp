import { useState, type FC } from 'react'

import { useLoaderData } from 'react-router-dom'

import type { WatchVideoLoaderData } from '@/features/video/types'
import { useFetchVideoDetails } from '@/features/video/hooks'

import WatchVideoSkeleton from '@/components/ui/WatchVideoSkeleton'

import VideoSection from '@/features/video/components/VideoSection'
import VideoPlayer from '@/features/video/components/VideoPlayer'
import SuggestionVideoList from '@/features/video/components/SuggestionVideoList'
import VideoCommentsSection from '@/features/comment/components/VideoCommentsSection'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import { getIsTheaterViewModeFromLocalStorage } from '@/features/video/utils'

const WatchVideoPage: FC = () => {
  const [isTheaterViewMode, setIsTheaterViewMode] = useState(
    getIsTheaterViewModeFromLocalStorage()
  )

  const { videoId } = useLoaderData() as WatchVideoLoaderData

  const { video, isLoading, isSuccess } = useFetchVideoDetails(videoId)

  if (isLoading)
    return <WatchVideoSkeleton isTheaterViewMode={isTheaterViewMode} />

  if (isSuccess && video)
    return (
      <Container
        maxWidth='xl'
        component='main'
        sx={{
          mt: '56px',
          color: 'white',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr minmax(28.5%, 400px)' },
          '&.MuiContainer-maxWidthXl': {
            paddingX: isTheaterViewMode ? 0 : { xs: '24px', md: '40px' }
          }
        }}
      >
        <Box
          sx={{ gridColumnStart: 1, gridColumnEnd: isTheaterViewMode ? 3 : 1 }}
          height={isTheaterViewMode ? '78vh' : '100%'}
          bgcolor={isTheaterViewMode ? 'black' : 'transparent'}
          pt={isTheaterViewMode ? 0 : 2.5}
          pr={isTheaterViewMode ? 0 : { xs: 0, md: 2.5 }}
        >
          <VideoPlayer
            videoUrl={video.videoUrl}
            setIsTheaterViewMode={setIsTheaterViewMode}
            isTheaterViewMode={isTheaterViewMode}
          />
        </Box>

        <Box
          pt={2.5}
          pr={{ xs: isTheaterViewMode ? 2.5 : 0, md: 2.5 }}
          pl={{ xs: isTheaterViewMode ? 2.5 : 0, md: 0 }}
          sx={{
            gridColumnStart: { xs: 1, md: 2 },
            gridRowStart: { xs: 3, md: isTheaterViewMode ? 2 : 1 },
            gridRowEnd: { xs: 3, md: 5 }
          }}
        >
          <SuggestionVideoList videoId={video.id} />
        </Box>

        <Box
          sx={{ gridColumnStart: 1, gridRowStart: 2 }}
          pl={isTheaterViewMode ? 2.5 : 0}
          pr={{ xs: isTheaterViewMode ? 2.5 : 0, md: 2.5 }}
          pt={1}
        >
          <VideoSection video={video} />
        </Box>

        <Box
          sx={{ gridColumnStart: 1, gridRowStart: 4 }}
          pl={isTheaterViewMode ? 2.5 : 0}
          pr={{ xs: isTheaterViewMode ? 2.5 : 0, md: 2.5 }}
          mb={2}
        >
          <VideoCommentsSection
            totalComments={video.totalComments}
            videoId={video.id}
          />
        </Box>
      </Container>
    )
}

export default WatchVideoPage
