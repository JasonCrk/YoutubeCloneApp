import { FC, ReactNode, useState } from 'react'

import {
  NavbarAsideContext,
  NavbarAsideContextDefaultStates,
  NavbarAsideState,
  navbarAsideContext
} from '@/contexts/NavbarAside'

interface Props {
  children: ReactNode
  defaultStates?: NavbarAsideContextDefaultStates
}

export const NavbarAsideFloatProvider: FC<Props> = ({
  children,
  defaultStates
}) => {
  const [state, setState] = useState<NavbarAsideContext['state']>(
    defaultStates?.state ?? NavbarAsideState.CLOSE
  )

  const toggleNavbarAside: NavbarAsideContext['toggleNavbarAside'] = () => {
    setState(prevState =>
      prevState === NavbarAsideState.CLOSE
        ? NavbarAsideState.FLOAT
        : NavbarAsideState.CLOSE
    )
  }

  return (
    <navbarAsideContext.Provider value={{ state, toggleNavbarAside }}>
      {children}
    </navbarAsideContext.Provider>
  )
}
