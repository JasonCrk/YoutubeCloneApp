import { FC } from 'react'

import { useAppSelector } from '@store/hooks'

import ChannelOptions from '@features/channel/components/ChannelOptions'

import UploadVideoButton from '@features/video/components/UploadVideoButton'

import SignInButton from '@features/auth/components/SignInButton'

import { Box } from '@mui/material'

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
        <SignInButton />
      )}
    </Box>
  )
}

export default TopBarOptions
