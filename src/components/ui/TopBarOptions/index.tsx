import { FC } from 'react'

import { useAppSelector } from '@store/hooks'

import ChannelOptions from '@features/channel/components/ChannelOptions'

import UploadVideoButton from '@features/video/components/UploadVideoButton'

import { Box, Button } from '@mui/material'

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'

const TopBarOptions: FC = () => {
  const isAuth = useAppSelector(state => state.auth.isAuth)

  return (
    <Box
      data-testid='TopBarOptions'
      display={'flex'}
      gap={2}
      alignItems={'center'}
    >
      {isAuth ? (
        <>
          <UploadVideoButton />
          <ChannelOptions />
        </>
      ) : (
        <Button
          startIcon={<AccountCircleOutlinedIcon />}
          data-testid='signInButton'
          variant='outlined'
          sx={{ borderRadius: '60px' }}
        >
          Sign in
        </Button>
      )}
    </Box>
  )
}

export default TopBarOptions
