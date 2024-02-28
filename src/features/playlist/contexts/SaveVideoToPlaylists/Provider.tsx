import { useState, type FC, type ReactNode } from 'react'

import {
  SaveVideoToPlaylistsContext,
  saveVideoToPlaylistsContext
} from '@/features/playlist/contexts/SaveVideoToPlaylists'

import SaveVideoToPlaylistsModal from '@/features/playlist/components/SaveVideoToPlaylistsModal'

import type { VideoId } from '@/features/video/types'

interface Props {
  children: ReactNode
}

const SaveVideoToPlaylistsProvider: FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] =
    useState<SaveVideoToPlaylistsContext['isOpen']>(false)
  const [selectedVideoId, setSelectedVideoId] =
    useState<SaveVideoToPlaylistsContext['selectedVideoId']>(null)

  const onOpen = (videoId: VideoId) => {
    setIsOpen(true)
    setSelectedVideoId(videoId)
  }

  const onClose = () => {
    setIsOpen(false)
    setSelectedVideoId(null)
  }

  return (
    <saveVideoToPlaylistsContext.Provider
      value={{ isOpen, onClose, onOpen, selectedVideoId }}
    >
      <SaveVideoToPlaylistsModal />

      {children}
    </saveVideoToPlaylistsContext.Provider>
  )
}

export default SaveVideoToPlaylistsProvider
