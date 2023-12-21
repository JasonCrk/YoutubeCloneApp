import { FC, useContext } from 'react'

import {
  AuthenticationOptions,
  authModalContext
} from '@features/auth/contexts/AuthModal'
import SignInForm from '@features/auth/components/SignInForm'
import SignUpForm from '@features/auth/components/SignUpForm'

import { Box, Modal } from '@mui/material'

const AuthModal: FC = () => {
  const { isOpen, authForm, onClose } = useContext(authModalContext)

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
        {authForm === AuthenticationOptions.SIGN_IN ? (
          <SignInForm />
        ) : authForm === AuthenticationOptions.SIGN_UP ? (
          <SignUpForm />
        ) : null}
      </Box>
    </Modal>
  )
}

export default AuthModal
