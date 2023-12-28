import { FC } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useCallService } from '@/hooks/useCallService.hook'

import {
  SignUpInputsAdapter,
  SignUpResponseAdapter
} from '@/features/auth/models'
import { signUpService } from '@/features/auth/services'
import { signUpValidator } from '@/features/auth/validators'

import PasswordField from '@/features/auth/components/PasswordField'

import { Button, Stack, TextField, Typography } from '@mui/material'

import toast from 'react-hot-toast'

interface Props {
  onSuccess?: (data: SignUpResponseAdapter) => void
  onSettled?: () => void
}

const SignUpForm: FC<Props> = ({ onSuccess, onSettled }) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<SignUpInputsAdapter>({
    resolver: zodResolver(signUpValidator)
  })

  const { callService: callSignUpService, isPending } = useCallService({
    serviceFn: signUpService,
    onSettled,
    onSuccess: data => {
      toast.success(
        'You have received a link in your email to activate your account.',
        {
          duration: 4000
        }
      )
      if (onSuccess) onSuccess(data)
    },
    onError: () => {
      toast.error('An error occurred', {
        duration: 4000
      })
    }
  })

  const handleSignUp = handleSubmit(userData => {
    callSignUpService(userData)
  })

  return (
    <Stack
      data-testid='SignUpForm'
      component={'form'}
      spacing={2}
      onSubmit={handleSignUp}
    >
      <Typography component={'h2'} variant='h4' textAlign={'center'}>
        Sign up
      </Typography>

      <TextField
        label='Username'
        {...register('username')}
        error={Boolean(errors.username)}
        helperText={errors.username?.message}
      />

      <TextField
        label='First name'
        {...register('firstName')}
        error={Boolean(errors.firstName)}
        helperText={errors.firstName?.message}
      />

      <TextField
        label='Last name'
        {...register('lastName')}
        error={Boolean(errors.lastName)}
        helperText={errors.lastName?.message}
      />

      <TextField
        label='Email'
        type='email'
        {...register('email')}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />

      <PasswordField
        id='password'
        label='Password'
        register={register}
        name='password'
        error={Boolean(errors.password)}
        errorMessage={errors.password?.message}
      />

      <PasswordField
        id='confirmPassword'
        label='Confirm password'
        register={register}
        name='confirmPassword'
        error={Boolean(errors.confirmPassword)}
        errorMessage={errors.confirmPassword?.message}
      />

      <Button
        role='button'
        type='submit'
        variant='contained'
        disabled={isPending}
      >
        Sign up
      </Button>
    </Stack>
  )
}

export default SignUpForm
