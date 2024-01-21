import { FC, useContext } from 'react'

import {
  AuthenticationOptions,
  authModalContext
} from '@/features/auth/contexts/AuthModal'

import { Button } from '@mui/material'

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'

const SignInButton: FC = () => {
  const { onOpen, changeAuthForm } = useContext(authModalContext)

  const handleSignIn = () => {
    changeAuthForm(AuthenticationOptions.SIGN_IN)
    onOpen()
  }

  return (
    <Button
      startIcon={<AccountCircleOutlinedIcon />}
      data-testid='SignInButton'
      variant='outlined'
      onClick={() => handleSignIn()}
      role='button'
      sx={{
        borderRadius: '60px',
        textTransform: 'capitalize'
      }}
    >
      Sign in
    </Button>
  )
}

export default SignInButton
