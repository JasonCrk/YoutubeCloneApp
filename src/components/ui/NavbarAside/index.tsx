import type { FC } from 'react'

import { useNavbarAsideContext } from '@/hooks'

import { NavbarAsideState } from '@/contexts/NavbarAside'

import FullNavbarAside from './FullNavbarAside'
import ShortNavbarAside from './ShortNavbarAside'
import FloatNavbarAside from './FloatNavbarAside'

const NavbarAside: FC = () => {
  const { state } = useNavbarAsideContext()

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
