import type { FC } from 'react'

import { AuthenticationOptions } from '@/features/auth/contexts/AuthModal'

import { useAuthModalContext } from '@/features/auth/hooks'

import { Button } from '@mui/material'

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'

const SignInButton: FC = () => {
  const { onOpen, changeAuthForm } = useAuthModalContext()

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
