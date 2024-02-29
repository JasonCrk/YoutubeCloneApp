import { useMutation } from '@tanstack/react-query'

import toast from 'react-hot-toast'

import { signUpService } from '@/features/auth/services'

export const useSignUp = () => {
  const {
    mutate: mutateSignUp,
    mutateAsync: mutateAsyncSignUp,
    ...mutationResult
  } = useMutation({
    mutationFn: signUpService,
    onSuccess: () => {
      toast.success(
        'You have received a link in your email to activate your account.',
        {
          duration: 4000
        }
      )
    },
    onError: () => {
      toast.error('An error occurred', {
        duration: 4000
      })
    }
  })

  return { mutateSignUp, mutateAsyncSignUp, ...mutationResult }
}
