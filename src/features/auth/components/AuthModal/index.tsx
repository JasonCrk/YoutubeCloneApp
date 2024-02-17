import type { FC } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { AuthenticationOptions } from '@/features/auth/contexts/AuthModal'

import { useAuthModalContext } from '@/features/auth/hooks'

import SignInForm from '@/features/auth/components/SignInForm'
import SignUpForm from '@/features/auth/components/SignUpForm'

import { Box, Modal, Typography } from '@mui/material'

const AuthModal: FC = () => {
  const { isOpen, authForm, onClose, changeAuthForm } = useAuthModalContext()

  const navigate = useNavigate()
  const location = useLocation()

  const handleSignInSuccess = () => {
    if (location.pathname === '/') window.location.reload()
    else {
      navigate('/')
      window.location.reload()
    }
  }

  const handleSignUpSuccess = () =>
    changeAuthForm(AuthenticationOptions.SIGN_IN)

  const handleChangeAuthForm = () => {
    if (authForm === AuthenticationOptions.SIGN_IN) {
      changeAuthForm(AuthenticationOptions.SIGN_UP)
    } else if (authForm === AuthenticationOptions.SIGN_UP) {
      changeAuthForm(AuthenticationOptions.SIGN_IN)
    }
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        data-testid='AuthModal'
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          p: 4,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2
        }}
      >
        <Box width='400px' color={'white'}>
          {authForm === AuthenticationOptions.SIGN_IN ? (
            <SignInForm onSuccess={handleSignInSuccess} />
          ) : authForm === AuthenticationOptions.SIGN_UP ? (
            <SignUpForm onSuccess={handleSignUpSuccess} />
          ) : null}

          <Typography component='div' textAlign='center' color='white' mt={2}>
            {authForm === AuthenticationOptions.SIGN_IN
              ? 'You are registered? Sign in '
              : authForm === AuthenticationOptions.SIGN_UP
                ? 'You are not registered? Sign up '
                : null}
            <Typography
              component='span'
              color='primary'
              onClick={handleChangeAuthForm}
              sx={{
                cursor: 'pointer',
                ':hover': {
                  textDecoration: 'underline',
                  textUnderlineOffset: 3
                }
              }}
            >
              HERE
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Modal>
  )
}

export default AuthModal
