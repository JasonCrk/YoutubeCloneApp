import { useContext } from 'react'

import { NavbarAsideContext, navbarAsideContext } from '@/contexts/NavbarAside'

export const useNavbarAsideContext = (): NavbarAsideContext => {
  const navbarAsideContextValue = useContext(navbarAsideContext)

  if (!navbarAsideContextValue) throw new Error('Mensaje')

  return navbarAsideContextValue
}
