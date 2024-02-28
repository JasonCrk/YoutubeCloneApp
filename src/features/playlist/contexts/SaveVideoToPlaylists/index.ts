import { createContext } from 'react'

import type { VideoId } from '@/features/video/types'

export interface SaveVideoToPlaylistsContext {
  onOpen: (videoId: VideoId) => void
  onClose: () => void
  isOpen: boolean
  selectedVideoId: VideoId | null
}

export const saveVideoToPlaylistsContext =
  createContext<SaveVideoToPlaylistsContext>({
    onClose: () => {},
    onOpen: () => {},
    isOpen: false,
    selectedVideoId: null
  })
