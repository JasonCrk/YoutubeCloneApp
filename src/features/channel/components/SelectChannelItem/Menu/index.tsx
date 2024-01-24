import { FC } from 'react'

import { useMutation } from '@tanstack/react-query'

import { ChannelId, ListChannelAdapter } from '@/features/channel/models'

import { switchChannelService } from '@/features/channel/services'

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
  const { mutate: callSwitchChannel } = useMutation({
    mutationFn: switchChannelService,
    onSuccess: () => {
      window.location.reload()
    },
    onError: () => {
      setDisabled(false)
    }
  })

  const handleSwitchChannel = () => {
    if (currentChannelId !== channel.id && !disabled) {
      setDisabled(true)
      callSwitchChannel(channel.id)
    }
  }

  return (
    <MenuItemWrapper onClick={handleSwitchChannel} disabled={disabled}>
      <SelectChannelItem {...channel} currentChannelId={currentChannelId} />
    </MenuItemWrapper>
  )
}

export default SelectChannelMenuItem
