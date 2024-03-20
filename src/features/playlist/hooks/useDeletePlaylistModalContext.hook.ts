import { useContext } from 'react'

import {
  type DeletePlaylistModalContext,
  deletePlaylistModalContext
} from '@/features/playlist/contexts/DeletePlaylistModal'

export const useDeletePlaylistModalContext = (): DeletePlaylistModalContext => {
  const deletePlaylistModalContextData = useContext(deletePlaylistModalContext)

  if (!deletePlaylistModalContextData)
    throw new Error(
      'The component is not found within the DeletePlaylistModalProvider context'
    )

  return deletePlaylistModalContextData
}
