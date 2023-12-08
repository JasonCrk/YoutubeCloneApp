import { createContext } from 'react'

export enum NavbarAsideState {
  CLOSE,
  FULL,
  SHORT,
  FLOAT
}

export interface NavbarAsideContext {
  state: NavbarAsideState
  changeNavbarAsideState: (state: NavbarAsideState) => void
}

export const navbarAsideContext = createContext<NavbarAsideContext>({
  state: NavbarAsideState.FULL,
  changeNavbarAsideState: () => {}
})
