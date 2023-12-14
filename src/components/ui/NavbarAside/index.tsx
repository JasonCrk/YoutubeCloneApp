import { FC, useContext } from 'react'

import { NavbarAsideState, navbarAsideContext } from '@contexts/NavbarAside'

import FullNavbarAside from './FullNavbarAside'
import ShortNavbarAside from './ShortNavbarAside'
import FloatNavbarAside from './FloatNavbarAside'

const NavbarAside: FC = () => {
  const { state } = useContext(navbarAsideContext)

  return (
    <>
      <FloatNavbarAside />

      {state === NavbarAsideState.FULL ? (
        <FullNavbarAside />
      ) : state === NavbarAsideState.SHORT ? (
        <ShortNavbarAside />
      ) : null}
    </>
  )
}

export default NavbarAside
