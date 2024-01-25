import { createContext } from 'react'

export interface CreateChannelModalContext {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const createChannelModalContext =
  createContext<CreateChannelModalContext>({
    isOpen: false,
    onOpen: () => {},
    onClose: () => {}
  })
