import { useState, type FC, type ReactNode } from 'react'

import type { PlaylistId } from '@/features/playlist/types'
import {
  type DeletePlaylistModalContext,
  deletePlaylistModalContext
} from '@/features/playlist/contexts/DeletePlaylistModal'

import DeletePlaylistModal from '@/features/playlist/components/DeletePlaylistModal'

const DeletePlaylistModalProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  const [isOpen, setIsOpen] =
    useState<DeletePlaylistModalContext['isOpen']>(false)
  const [playlistIdToDelete, setPlaylistIdToDelete] =
    useState<DeletePlaylistModalContext['playlistId']>(null)

  const onOpen = (playlistId: PlaylistId) => {
    setPlaylistIdToDelete(playlistId)
    setIsOpen(true)
  }

  const onClose = () => {
    setPlaylistIdToDelete(null)
    setIsOpen(false)
  }

  return (
    <deletePlaylistModalContext.Provider
      value={{
        isOpen,
        onClose,
        onOpen,
        playlistId: playlistIdToDelete
      }}
    >
      <DeletePlaylistModal />
      {children}
    </deletePlaylistModalContext.Provider>
  )
}

export default DeletePlaylistModalProvider
