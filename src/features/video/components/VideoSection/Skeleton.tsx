import type { FC } from 'react'

import ChannelInfoSkeleton from '@/features/channel/components/ChannelInfo/Skeleton'

import { Box, Skeleton, Typography } from '@mui/material'

const VideoSectionSkeleton: FC = () => {
  return (
    <Box>
      <Typography component='h3' variant='h5' fontWeight='bold' mt={0.5}>
        <Skeleton />
      </Typography>

      <Box display='flex' justifyContent='space-between' py={1}>
        <Box display='flex' alignItems='center' gap={3}>
          <ChannelInfoSkeleton />

          <Skeleton
            variant='rounded'
            height='40px'
            width='105px'
            sx={{ borderRadius: '99px' }}
          />
        </Box>
      </Box>

      <Box bgcolor='background.paper' borderRadius='10px' p={2}>
        <Typography
          component='p'
          variant='body2'
          fontWeight='bold'
          mb={0.5}
          width='200px'
        >
          <Skeleton />
        </Typography>

        <Typography component='p' variant='body1'>
          <Skeleton />
          <Skeleton />
        </Typography>
      </Box>
    </Box>
  )
}

export default VideoSectionSkeleton
