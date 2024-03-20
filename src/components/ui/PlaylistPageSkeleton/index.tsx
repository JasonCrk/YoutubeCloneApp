import type { FC } from 'react'

import SidePlaylistDetailsSkeleton from '@/features/playlist/components/SidePlaylistDetails/Skeleton'

import { Box, CircularProgress, Container } from '@mui/material'

interface Props {
  disableGutters: boolean
}

const PlaylistPageSkeleton: FC<Props> = ({ disableGutters }) => {
  return (
    <Container
      disableGutters={disableGutters}
      maxWidth='xl'
      component='main'
      sx={{
        mt: { xs: '56px', md: '80px' },
        display: 'grid',
        color: 'white',
        gap: 0.5,
        gridTemplateColumns: { xs: '1fr', md: '360px 1fr' },
        '&.MuiContainer-maxWidthXl': {
          paddingX: { xs: 0, md: '36px' }
        }
      }}
    >
      <SidePlaylistDetailsSkeleton />

      <Box flexGrow={1} display='flex' justifyContent='center'>
        <CircularProgress sx={{ width: '50px', mt: 2 }} color='inherit' />
      </Box>
    </Container>
  )
}

export default PlaylistPageSkeleton
