import type { FC } from 'react'

import { useCreateChannelModalContext } from '@/features/channel/hooks'

import MenuItem from '@/components/ui/MenuItem'

import PersonAddIcon from '@mui/icons-material/PersonAddOutlined'

const CreateChannelMenuOption: FC = () => {
  const { onOpen } = useCreateChannelModalContext()

  return (
    <MenuItem
      startIcon={<PersonAddIcon />}
      data-testid='CreateChannelMenuOption'
      onClick={onOpen}
    >
      Add account
    </MenuItem>
  )
}

export default CreateChannelMenuOption
