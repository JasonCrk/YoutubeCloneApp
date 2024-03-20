import { useState, type FC, type ReactNode } from 'react'

import { useAppSelector } from '@/store/hooks'

import {
  type SaveVideoToPlaylistsContext,
  saveVideoToPlaylistsContext
} from '@/features/playlist/contexts/SaveVideoToPlaylists'

import type { VideoId } from '@/features/video/types'
import { useAuthModalContext } from '@/features/auth/hooks'

import SaveVideoToPlaylistsModal from '@/features/playlist/components/SaveVideoToPlaylistsModal'

interface Props {
  children: ReactNode
}

const SaveVideoToPlaylistsProvider: FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] =
    useState<SaveVideoToPlaylistsContext['isOpen']>(false)
  const [selectedVideoId, setSelectedVideoId] =
    useState<SaveVideoToPlaylistsContext['selectedVideoId']>(null)

  const { onOpen: onOpenAuthModal } = useAuthModalContext()

  const isAuth = useAppSelector(state => state.auth.isAuth)

  const onOpen = (videoId: VideoId) => {
    if (!isAuth) {
      onOpenAuthModal()
      return
    }

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
