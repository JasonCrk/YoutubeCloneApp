import { createContext } from 'react'

export enum AuthenticationOptions {
  SIGN_IN,
  SIGN_UP
}

export interface AuthModalContext {
  isOpen: boolean
  authForm: AuthenticationOptions
  onClose: () => void
  onOpen: () => void
  changeAuthForm: (authForm: AuthenticationOptions) => void
}

export const authModalContext = createContext<AuthModalContext>({
  isOpen: false,
  authForm: AuthenticationOptions.SIGN_IN,
  onClose: () => {},
  onOpen: () => {},
  changeAuthForm: () => {}
})

export type AuthModalDefaultStates = Pick<
  AuthModalContext,
  'authForm' | 'isOpen'
>
