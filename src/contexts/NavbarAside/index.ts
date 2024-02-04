import { createContext } from 'react'

export enum NavbarAsideState {
  CLOSE,
  FULL,
  SHORT,
  FLOAT
}

export interface NavbarAsideContext {
  state: NavbarAsideState
  toggleNavbarAside: () => void
}

export const navbarAsideContext = createContext<NavbarAsideContext>({
  state: NavbarAsideState.FULL,
  toggleNavbarAside: () => {}
})

export type NavbarAsideContextDefaultStates = Pick<NavbarAsideContext, 'state'>
