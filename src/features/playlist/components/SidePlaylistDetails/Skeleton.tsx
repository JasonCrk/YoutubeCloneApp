import type { FC } from 'react'

import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

import grey from '@mui/material/colors/grey'
import { Typography } from '@mui/material'

const SidePlaylistDetailsSkeleton: FC = () => {
  return (
    <Box
      p={3}
      gap={2}
      component='section'
      borderRadius={{ base: 0, md: '15px 15px 0 0' }}
      overflow='hidden'
      flexDirection='column'
      display='flex'
      color='white'
      mb={{ xs: 0, md: 2 }}
      sx={{
        background: `linear-gradient(${grey[800]}, transparent)`
      }}
    >
      <Box
        gap={2}
        display='flex'
        flexGrow={1}
        flexDirection={{ base: 'row', md: 'column', sm: 'row', xs: 'column' }}
        justifyContent={{
          md: 'start',
          base: 'space-around'
        }}
      >
        <Skeleton
          variant='rounded'
          sx={{
            maxWidth: '350px',
            borderRadius: 3,
            height: 'fit-content',
            aspectRatio: 16 / 9
          }}
        />

        <Box flexGrow={{ xs: 1, md: 0 }}>
          <Typography variant='h5' fontWeight='bold'>
            <Skeleton />
          </Typography>

          <Box
            my={1.6}
            display='flex'
            flexDirection='column'
            position={{ xs: 'relative', md: 'static' }}
            gap={1}
            alignItems='start'
          >
            <Typography
              variant='body1'
              width='fit-content'
              fontWeight='bold'
              sx={{ width: '80px' }}
            >
              <Skeleton />
            </Typography>

            <Typography fontSize='0.8rem' width='100%'>
              <Skeleton />
            </Typography>

            <Skeleton
              width='100%'
              height='36px'
              sx={{ borderRadius: '999px' }}
              variant='rounded'
            />

            <Typography mt={1} component='p' variant='body2' width='100%'>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default SidePlaylistDetailsSkeleton
