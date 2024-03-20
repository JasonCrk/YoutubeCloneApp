import { createContext } from 'react'

import type { PlaylistId } from '@/features/playlist/types'

export interface DeletePlaylistModalContext {
  isOpen: boolean
  onOpen: (playlistId: PlaylistId) => void
  onClose: () => void
  playlistId: PlaylistId | null
}

export const deletePlaylistModalContext =
  createContext<DeletePlaylistModalContext>({
    isOpen: false,
    playlistId: null,
    onClose: () => {},
    onOpen: () => {}
  })
