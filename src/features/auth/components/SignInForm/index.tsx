import type { FC } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { SignInInputs } from '@/features/auth/models'
import { useSignIn } from '@/features/auth/hooks'
import { signInValidator } from '@/features/auth/validators'

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

  const { mutateSignIn, isPending } = useSignIn()

  const handleSignInSubmit = handleSubmit(credentials => {
    mutateSignIn(credentials, {
      onSuccess,
      onSettled
    })
  })

  return (
    <Stack
      spacing={2}
      component='form'
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
