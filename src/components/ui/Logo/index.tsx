import { FC } from 'react'

import { Link } from 'react-router-dom'

import { Box, Typography } from '@mui/material'

import logo from '@/assets/images/youtube-logo.png'

const Logo: FC = () => {
  return (
    <Box
      component={Link}
      to='/'
      data-testid='Logo'
      role='link'
      display={'flex'}
      alignItems={'center'}
      gap={'3px'}
      sx={{ textDecoration: 'none' }}
    >
      <img src={logo} alt='youtube clone' style={{ width: '34px' }} />
      <Typography
        component={'span'}
        variant='h6'
        color={'white'}
        sx={{
          fontStretch: '10%',
          fontFamily: 'YouTube, sans-serif',
          fontWeight: 'bold'
        }}
      >
        YouTube
      </Typography>
    </Box>
  )
}

export default Logo
