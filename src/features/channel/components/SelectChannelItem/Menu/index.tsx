import type { FC } from 'react'

import type { ListChannelAdapter } from '@/features/channel/models'
import type { ChannelId } from '@/features/channel/types'
import { useSwitchChannel } from '@/features/channel/hooks'

import MenuItemWrapper from '@/components/ui/MenuItemWrapper'

import SelectChannelItem from '@/features/channel/components/SelectChannelItem'

interface Props extends ListChannelAdapter {
  disabled?: boolean
  setDisabled: (value: boolean) => void
  currentChannelId: ChannelId
}

const SelectChannelMenuItem: FC<Props> = ({
  currentChannelId,
  setDisabled,
  disabled,
  ...channel
}) => {
  const { mutateSwitchChannel } = useSwitchChannel()

  const handleSwitchChannel = () => {
    if (currentChannelId !== channel.id && !disabled) {
      setDisabled(true)
      mutateSwitchChannel(channel.id, {
        onSuccess: () => {
          window.location.reload()
        },
        onError: () => {
          setDisabled(false)
        }
      })
    }
  }

  return (
    <MenuItemWrapper onClick={handleSwitchChannel} disabled={disabled}>
      <SelectChannelItem {...channel} currentChannelId={currentChannelId} />
    </MenuItemWrapper>
  )
}

export default SelectChannelMenuItem
