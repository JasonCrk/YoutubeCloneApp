import { useFetchTrendingVideos } from '@/features/video/hooks'

import BlockVideoItem from '@/features/video/components/BlockVideoItem'
import BlockVideoItemSkeleton from '@/features/video/components/BlockVideoItemSkeleton'

import { Box, Grid, Typography } from '@mui/material'

import ErrorIcon from '@mui/icons-material/Error'

function HomePage() {
  const { data: trendingVideos, isLoading, isError } = useFetchTrendingVideos()

  if (isLoading)
    return (
      <Box sx={{ width: '100%', paddingTop: '56px' }}>
        <Grid container pl={4.5} pr={3} pt={1} rowSpacing={4} columnSpacing={2}>
          {[...Array(6)].map(() => (
            <Grid item key={crypto.randomUUID()} xs={12} sm={6} md={4} xl={4}>
              <BlockVideoItemSkeleton />
            </Grid>
          ))}
        </Grid>
      </Box>
    )

  if (isError)
    return (
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          paddingTop: '56px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          color: 'white'
        }}
      >
        <ErrorIcon sx={{ fontSize: '100px' }} />
        <Typography variant='h6'>Error loading videos</Typography>
      </Box>
    )

  return (
    <Box sx={{ width: '100%', paddingTop: '56px' }}>
      <Grid container pl={4.5} pr={3} pt={1} rowSpacing={4} columnSpacing={2}>
        {trendingVideos &&
          trendingVideos.map(trendVideo => (
            <Grid item key={trendVideo.id} xs={12} sm={6} md={4} xl={4}>
              <BlockVideoItem key={trendVideo.id} {...trendVideo} />
            </Grid>
          ))}
      </Grid>
    </Box>
  )
}

export default HomePage
