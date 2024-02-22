import type { FC } from 'react'

import { Box, Skeleton, Typography } from '@mui/material'

const BlockPlaylistItemSkeleton: FC = () => {
  return (
    <Box>
      <Skeleton
        variant='rounded'
        width={'100%'}
        height={'100%'}
        sx={{ maxWidth: '500px', maxHeight: '250px', aspectRatio: 16 / 9 }}
      />

      <Box mt={1}>
        <Typography fontSize={'1.2rem'}>
          <Skeleton width={'100%'} />
        </Typography>

        <Skeleton width={'50px'} height={'20px'} variant='rounded' />

        <Typography fontSize={'1rem'}>
          <Skeleton width={'50%'} />
        </Typography>
      </Box>
    </Box>
  )
}

export default BlockPlaylistItemSkeleton
