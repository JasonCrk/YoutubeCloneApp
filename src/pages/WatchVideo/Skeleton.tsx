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
        pr={2.5}
        display='flex'
        justifyContent='center'
        sx={{ gridColumnStart: isTheaterViewMode ? 2 : undefined }}
      >
        <CircularProgress />
      </Box>

      <Box
        sx={{ gridColumnStart: 1, gridRowStart: 2 }}
        pl={isTheaterViewMode ? 2.5 : 0}
        pr={2.5}
        pt={1}
        mb={2}
      >
        <VideoSectionSkeleton />
      </Box>
    </Container>
  )
}

export default WatchVideoSkeleton
