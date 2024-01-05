import { FC } from 'react'

import { Avatar, Box, Skeleton, Typography } from '@mui/material'

const BlockVideoItemSkeleton: FC = () => {
  return (
    <Box maxWidth={'500px'}>
      <Skeleton
        variant='rounded'
        width={'100%'}
        height={'100%'}
        sx={{ maxWidth: '500px', maxHeight: '250px', aspectRatio: 16 / 9 }}
      />

      <Box display={'flex'} alignItems={'start'} mt={2} gap={1}>
        <Skeleton variant='circular'>
          <Avatar />
        </Skeleton>

        <Box display={'flex'} flexDirection={'column'} width={'100%'}>
          <Typography fontSize={'1.1rem'}>
            <Skeleton width={'100%'} />
          </Typography>
          <Typography fontSize={'1.1rem'}>
            <Skeleton width={'100%'} />
          </Typography>

          <div style={{ marginTop: 4 }}>
            <Typography fontSize={'0.9rem'}>
              <Skeleton width={'100px'} />
            </Typography>
            <Typography fontSize={'0.9rem'}>
              <Skeleton width={'50%'} />
            </Typography>
          </div>
        </Box>
      </Box>
    </Box>
  )
}

export default BlockVideoItemSkeleton
