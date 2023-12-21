import { FC, useContext } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useCallService } from '@hooks/useCallService.hook'

import { SignInInputs } from '@features/auth/models'
import { signInService } from '@features/auth/services'
import {
  AuthenticationOptions,
  authModalContext
} from '@features/auth/contexts/AuthModal'
import {
  setAccessTokenInLocalStorage,
  setRefreshTokenInLocalStorage
} from '@features/auth/utils/localStorage.util'
import { signInValidator } from '@features/auth/validators'

import PasswordField from '@features/auth/components/PasswordField'

import { Box, Button, Stack, TextField, Typography } from '@mui/material'

const SignInForm: FC = () => {
  const { changeAuthForm, onClose } = useContext(authModalContext)

  const navigate = useNavigate()
  const location = useLocation()

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<SignInInputs>({
    resolver: zodResolver(signInValidator)
  })

  const { callService: callSignInService, isPending } = useCallService({
    serviceFn: signInService,
    onSuccess: ({ access, refresh }) => {
      setAccessTokenInLocalStorage(access)
      setRefreshTokenInLocalStorage(refresh)

      if (location.pathname === '/') window.location.reload()
      else {
        navigate('/')
        onClose()
      }
    }
  })

  const handleSignInSubmit = handleSubmit(async credentials => {
    callSignInService(credentials)
  })

  const handleChangeFormToSignUp = () => {
    changeAuthForm(AuthenticationOptions.SIGN_UP)
  }

  return (
    <Box data-testid='SignInForm' width='400px'>
      <Typography
        variant='h4'
        component='h2'
        textAlign='center'
        color='white'
        mb={2}
      >
        Sign In
      </Typography>

      <Stack
        spacing={2}
        component={'form'}
        onSubmit={handleSignInSubmit}
        mb={1}
      >
        <TextField
          {...register('email')}
          label='Email'
          type='email'
          inputProps={{ role: 'textbox' }}
          helperText={errors.email?.message}
          error={Boolean(errors.email)}
        />

        <PasswordField
          id='password'
          name='password'
          register={register}
          label='Password'
          error={Boolean(errors.password)}
          errorMessage={errors.password?.message}
        />

        <Button
          role='button'
          type='submit'
          variant='contained'
          disabled={isPending}
        >
          Sign in
        </Button>
      </Stack>

      <Typography component='div' textAlign='center' color='white'>
        You are not registered? Sign up{' '}
        <Typography
          component='span'
          color='primary'
          onClick={() => handleChangeFormToSignUp()}
          sx={{
            cursor: 'pointer',
            ':hover': { textDecoration: 'underline', textUnderlineOffset: 3 }
          }}
        >
          HERE
        </Typography>
      </Typography>
    </Box>
  )
}

export default SignInForm
