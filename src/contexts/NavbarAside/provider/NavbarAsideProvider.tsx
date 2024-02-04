import { FC, ReactNode, useEffect, useState } from 'react'

import { useMediaQuery, useTheme } from '@mui/material'

import {
  navbarAsideContext,
  NavbarAsideState,
  NavbarAsideContext
} from '@/contexts/NavbarAside'

interface Props {
  children: ReactNode
  defaultStates?: Pick<NavbarAsideContext, 'state'>
}

export const NavbarAsideProvider: FC<Props> = ({ children, defaultStates }) => {
  const theme = useTheme()

  const isFull = useMediaQuery(theme.breakpoints.up('lg'))
  const isShort = useMediaQuery(theme.breakpoints.up('md'))

  const [state, setState] = useState<NavbarAsideContext['state']>(
    isFull
      ? NavbarAsideState.FULL
      : isShort
        ? NavbarAsideState.SHORT
        : NavbarAsideState.CLOSE
  )

  useEffect(() => {
    setState(
      isFull
        ? NavbarAsideState.FULL
        : isShort
          ? NavbarAsideState.SHORT
          : NavbarAsideState.CLOSE
    )
  }, [isFull, isShort])

  const toggleNavbarAside: NavbarAsideContext['toggleNavbarAside'] = () => {
    if (isFull) {
      setState(
        state === NavbarAsideState.FULL
          ? NavbarAsideState.SHORT
          : NavbarAsideState.FULL
      )
    } else if (isShort) {
      setState(
        state === NavbarAsideState.FLOAT
          ? NavbarAsideState.SHORT
          : NavbarAsideState.FLOAT
      )
    } else {
      setState(
        state === NavbarAsideState.CLOSE
          ? NavbarAsideState.FLOAT
          : NavbarAsideState.CLOSE
      )
    }
  }

  return (
    <navbarAsideContext.Provider
      value={{
        state: defaultStates?.state ?? state,
        toggleNavbarAside
      }}
    >
      {children}
    </navbarAsideContext.Provider>
  )
}
