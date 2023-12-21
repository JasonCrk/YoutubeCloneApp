import { FC, ReactNode, useState } from 'react'

import { AuthenticationOptions, authModalContext, AuthModalContext } from '.'

import AuthModal from '@features/auth/components/AuthModal'

interface Props {
  children: ReactNode
  defaultStates?: Pick<AuthModalContext, 'authForm' | 'isOpen'>
}

const AuthModalProvider: FC<Props> = ({ children, defaultStates }) => {
  const [isOpen, setIsOpen] = useState<AuthModalContext['isOpen']>(
    defaultStates?.isOpen ?? false
  )
  const [authForm, setAuthForm] = useState<AuthModalContext['authForm']>(
    defaultStates?.authForm ?? AuthenticationOptions.SIGN_IN
  )

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)
  const changeAuthForm: AuthModalContext['changeAuthForm'] = form =>
    setAuthForm(form)

  return (
    <authModalContext.Provider
      value={{ isOpen, authForm, onClose, onOpen, changeAuthForm }}
    >
      <AuthModal />

      {children}
    </authModalContext.Provider>
  )
}

export default AuthModalProvider
