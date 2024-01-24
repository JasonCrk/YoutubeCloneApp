import { FC } from 'react'

import { useMutation } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { SignInInputs } from '@/features/auth/models'
import { signInService } from '@/features/auth/services'
import { signInValidator } from '@/features/auth/validators'
import {
  setAccessTokenInLocalStorage,
  setRefreshTokenInLocalStorage
} from '@/features/auth/utils/localStorage.util'

import PasswordField from '@/features/auth/components/PasswordField'

import { Button, Stack, TextField, Typography } from '@mui/material'

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

  const { mutate: callSignInService, isPending } = useMutation({
    mutationFn: signInService,
    onSettled,
    onSuccess: ({ access, refresh }) => {
      setAccessTokenInLocalStorage(access)
      setRefreshTokenInLocalStorage(refresh)
      if (onSuccess) onSuccess()
    }
  })

  const handleSignInSubmit = handleSubmit(credentials => {
    callSignInService(credentials)
  })

  return (
    <Stack
      spacing={2}
      component={'form'}
      data-testid='SignInForm'
      onSubmit={handleSignInSubmit}
    >
      <Typography variant='h4' component='h2' textAlign='center'>
        Sign In
      </Typography>

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
  )
}

export default SignInForm
