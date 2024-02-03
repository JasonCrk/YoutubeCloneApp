import { useContext } from 'react'

import {
  UploadVideoModalContext,
  uploadVideoModalContext
} from '@/features/video/contexts/UploadVideoModal'

export const useUploadVideoModalContext = (): UploadVideoModalContext => {
  const uploadVideoModalContextValue = useContext(uploadVideoModalContext)

  if (!uploadVideoModalContextValue)
    throw new Error(
      'UploadVideoModalContext is required for the component to work'
    )

  return uploadVideoModalContextValue
}
