import { useContext } from 'react'

import {
  AuthModalContext,
  authModalContext
} from '@/features/auth/contexts/AuthModal'

export const useAuthModalContext = (): AuthModalContext => {
  const authModalContextValue = useContext(authModalContext)

  if (!authModalContextValue)
    throw new Error('AuthModalContext is required for the component to work')

  return authModalContextValue
}
