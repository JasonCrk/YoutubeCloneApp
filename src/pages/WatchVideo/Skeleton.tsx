import type { FC } from 'react'

import VideoSectionSkeleton from '@/features/video/components/VideoSection/Skeleton'

import { Box, CircularProgress, Container, Skeleton } from '@mui/material'

interface Props {
  isTheaterViewMode: boolean
}

const WatchVideoSkeleton: FC<Props> = ({ isTheaterViewMode }) => {
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
        <Skeleton
          variant='rounded'
          width='100%'
          sx={{ borderRadius: isTheaterViewMode ? undefined : '15px' }}
        >
          <div
            style={{
              aspectRatio: isTheaterViewMode ? undefined : 16 / 9,
              width: '100%'
            }}
          ></div>
        </Skeleton>
      </Box>

      <Box
        pt={2.5}
        display='flex'
        justifyContent='center'
        pr={{ xs: isTheaterViewMode ? 2.5 : 0, md: 2.5 }}
        pl={{ xs: isTheaterViewMode ? 2.5 : 0, md: 0 }}
        sx={{
          gridColumnStart: { xs: 1, md: 2 },
          gridRowStart: { xs: 3, md: isTheaterViewMode ? 2 : 1 },
          gridRowEnd: { xs: 3, md: 5 }
        }}
      >
        <CircularProgress color='inherit' />
      </Box>

      <Box
        sx={{ gridColumnStart: 1, gridRowStart: 2 }}
        pl={isTheaterViewMode ? 2.5 : 0}
        pr={{ xs: isTheaterViewMode ? 2.5 : 0, md: 2.5 }}
        pt={1}
      >
        <VideoSectionSkeleton />
      </Box>
    </Container>
  )
}

export default WatchVideoSkeleton
