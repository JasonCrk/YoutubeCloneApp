import { FC } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useCallService } from '@hooks/useCallService.hook'

import { SignInInputs } from '@features/auth/models'
import { signInService } from '@features/auth/services'
import { signInValidator } from '@features/auth/validators'
import {
  setAccessTokenInLocalStorage,
  setRefreshTokenInLocalStorage
} from '@features/auth/utils/localStorage.util'

import PasswordField from '@features/auth/components/PasswordField'

import { Box, Button, Stack, TextField, Typography } from '@mui/material'

interface Props {
  onSuccess?: () => void
  onSettled?: () => void
}

const SignInForm: FC<Props> = ({ onSettled, onSuccess }) => {
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
      if (onSuccess) onSuccess()
    },
    onError: () => {},
    onSettled
  })

  const handleSignInSubmit = handleSubmit(async credentials => {
    callSignInService(credentials)
  })

  return (
    <Box data-testid='SignInForm'>
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
    </Box>
  )
}

export default SignInForm
