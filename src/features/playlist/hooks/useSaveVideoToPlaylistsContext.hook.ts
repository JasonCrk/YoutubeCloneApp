import { useContext } from 'react'

import {
  SaveVideoToPlaylistsContext,
  saveVideoToPlaylistsContext
} from '@/features/playlist/contexts/SaveVideoToPlaylists'

export const useSaveVideoToPlaylistsContext =
  (): SaveVideoToPlaylistsContext => {
    const saveVideoToPlaylistsContextResult = useContext(
      saveVideoToPlaylistsContext
    )

    if (saveVideoToPlaylistsContextResult === null)
      throw new Error(
        'The component is not found within the SaveVideoToPlaylistsContextProvider context'
      )

    return saveVideoToPlaylistsContextResult
  }
