import { FC, ReactNode, useState } from 'react'

import {
  CreateChannelModalContext,
  createChannelModalContext
} from '@/features/channel/contexts/CreateChannelModal'
import CreateChannelModal from '@/features/channel/components/CreateChannelModal'

interface Props {
  defaultStates?: Pick<CreateChannelModalContext, 'isOpen'>
  children: ReactNode
}

const CreateChannelModalProvider: FC<Props> = ({ children, defaultStates }) => {
  const [isOpen, setIsOpen] = useState(defaultStates?.isOpen || false)

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  return (
    <createChannelModalContext.Provider value={{ isOpen, onClose, onOpen }}>
      <CreateChannelModal />
      {children}
    </createChannelModalContext.Provider>
  )
}

export default CreateChannelModalProvider
