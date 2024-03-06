import type { FC } from 'react'

import { Box, Skeleton, Typography } from '@mui/material'

const ChannelInfoSkeleton: FC = () => {
  return (
    <Box display='flex' gap={1} alignItems='center'>
      <Skeleton
        variant='circular'
        width='40px'
        height='40px'
        sx={{ aspectRatio: 1 / 1 }}
      />

      <Box>
        <Typography
          variant='subtitle1'
          lineHeight='20px'
          fontWeight='500'
          width='100px'
        >
          <Skeleton />
        </Typography>

        <Typography component='p' variant='caption' color='grey' width='80px'>
          <Skeleton />
        </Typography>
      </Box>
    </Box>
  )
}

export default ChannelInfoSkeleton
