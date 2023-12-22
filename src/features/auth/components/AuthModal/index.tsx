import { FC, useContext } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import {
  AuthenticationOptions,
  authModalContext
} from '@features/auth/contexts/AuthModal'
import SignInForm from '@features/auth/components/SignInForm'
import SignUpForm from '@features/auth/components/SignUpForm'

import { Box, Modal, Typography } from '@mui/material'

const AuthModal: FC = () => {
  const { isOpen, authForm, onClose, changeAuthForm } =
    useContext(authModalContext)

  const navigate = useNavigate()
  const location = useLocation()

  const handleSignInSuccess = () => {
    if (location.pathname === '/') window.location.reload()
    else navigate('/')
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
        <Box width='400px'>
          {authForm === AuthenticationOptions.SIGN_IN ? (
            <>
              <SignInForm onSuccess={handleSignInSuccess} />
              <Typography
                component='div'
                textAlign='center'
                color='white'
                mt={2}
              >
                You are not registered? Sign up{' '}
                <Typography
                  component='span'
                  color='primary'
                  onClick={() => changeAuthForm(AuthenticationOptions.SIGN_UP)}
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
            </>
          ) : authForm === AuthenticationOptions.SIGN_UP ? (
            <SignUpForm />
          ) : null}
        </Box>
      </Box>
    </Modal>
  )
}

export default AuthModal
