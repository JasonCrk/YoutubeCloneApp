import { useState, type FC } from 'react'

import { useLoaderData } from 'react-router-dom'

import type { WatchVideoLoaderData } from '@/features/video/types'
import { useFetchVideoDetails } from '@/features/video/hooks'

import VideoSection from '@/features/video/components/VideoSection'
import SuggestionVideoList from '@/features/video/components/SuggestionVideoList'
import VideoPlayer from '@/features/video/components/VideoPlayer'

import { Box, Container } from '@mui/material'

import { getIsTheaterViewModeFromLocalStorage } from '@/features/video/utils'

const WatchVideoPage: FC = () => {
  const [isTheaterViewMode, setIsTheaterViewMode] = useState(
    getIsTheaterViewModeFromLocalStorage()
  )

  const { videoId } = useLoaderData() as WatchVideoLoaderData

  const { video, isLoading, isSuccess } = useFetchVideoDetails(videoId)

  if (isLoading) return null

  if (isSuccess && video)
    return (
      <Container
        maxWidth='xl'
        disableGutters={isTheaterViewMode}
        component='div'
        sx={{
          mt: '56px',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr minmax(30%, 400px)' },
          color: 'white'
        }}
      >
        <Box
          gridColumn={isTheaterViewMode ? '1 / 3' : undefined}
          height={isTheaterViewMode ? '78vh' : '100%'}
          width='100%'
          bgcolor={isTheaterViewMode ? 'black' : 'transparent'}
          pt={isTheaterViewMode ? 0 : 2.5}
          pr={isTheaterViewMode ? 0 : 2.5}
        >
          <VideoPlayer
            videoUrl={video.videoUrl}
            setIsTheaterViewMode={setIsTheaterViewMode}
            isTheaterViewMode={isTheaterViewMode}
          />
        </Box>

        <Box
          pt={2.5}
          pr={2.5}
          sx={{ gridColumnStart: isTheaterViewMode ? 2 : undefined }}
        >
          <SuggestionVideoList />
        </Box>

        <Box
          sx={{ gridColumnStart: 1, gridRowStart: 2 }}
          pl={isTheaterViewMode ? 2.5 : 0}
          pr={2.5}
          pt={1}
          mb={2}
        >
          <VideoSection video={video} />
        </Box>
      </Container>
    )
}

export default WatchVideoPage
