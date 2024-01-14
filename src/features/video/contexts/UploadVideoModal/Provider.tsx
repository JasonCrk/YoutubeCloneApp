import { FC, ReactNode, useState } from 'react'

import {
  UploadVideoModalContext,
  uploadVideoModalContext
} from '@/features/video/contexts/UploadVideoModal'
import UploadVideoModal from '@/features/video/components/UploadVideoModal'

interface Props {
  defaultStates?: Pick<UploadVideoModalContext, 'isOpen'>
  children: ReactNode
}

const UploadVideoModalProvider: FC<Props> = ({ children, defaultStates }) => {
  const [isOpen, setIsOpen] = useState<UploadVideoModalContext['isOpen']>(
    defaultStates?.isOpen ?? false
  )

  const onClose: UploadVideoModalContext['onClose'] = () => setIsOpen(false)
  const onOpen: UploadVideoModalContext['onOpen'] = () => setIsOpen(true)

  return (
    <uploadVideoModalContext.Provider
      value={{
        isOpen,
        onClose,
        onOpen
      }}
    >
      <UploadVideoModal />

      {children}
    </uploadVideoModalContext.Provider>
  )
}

export default UploadVideoModalProvider
