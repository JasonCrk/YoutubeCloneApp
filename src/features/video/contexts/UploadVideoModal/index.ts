import { createContext } from 'react'

export interface UploadVideoModalContext {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

export const uploadVideoModalContext = createContext<UploadVideoModalContext>({
  isOpen: false,
  onClose: () => {},
  onOpen: () => {}
})
