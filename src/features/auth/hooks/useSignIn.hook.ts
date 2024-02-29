import { useMutation } from '@tanstack/react-query'

import { signInService } from '@/features/auth/services'
import {
  setAccessTokenInLocalStorage,
  setRefreshTokenInLocalStorage
} from '@/features/auth/utils'

export const useSignIn = () => {
  const {
    mutate: mutateSignIn,
    mutateAsync: mutateAsyncSignIn,
    ...mutationResult
  } = useMutation({
    mutationFn: signInService,
    onSuccess: ({ access, refresh }) => {
      setAccessTokenInLocalStorage(access)
      setRefreshTokenInLocalStorage(refresh)
    }
  })

  return { mutateAsyncSignIn, mutateSignIn, ...mutationResult }
}
