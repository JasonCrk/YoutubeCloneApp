import { FC, ReactNode, useEffect, useState } from 'react'

import { useMediaQuery, useTheme } from '@mui/material'

import { navbarAsideContext, NavbarAsideState, NavbarAsideContext } from '.'

const NavbarAsideProvider: FC<{ children: ReactNode }> = ({ children }) => {
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

  const changeNavbarAsideState: NavbarAsideContext['changeNavbarAsideState'] =
    newState => {
      setState(newState)
    }

  return (
    <navbarAsideContext.Provider
      value={{
        state,
        changeNavbarAsideState
      }}
    >
      {children}
    </navbarAsideContext.Provider>
  )
}

export default NavbarAsideProvider
