import { useState, type FC } from 'react'

import { useQuery } from '@tanstack/react-query'

import { useAppSelector } from '@/store/hooks'
import { listResponseAdapter } from '@/adapters/listResponse.adapter'

import { OptionsMenuTypes } from '@/features/channel/types'
import { retrieveOwnChannelsService } from '@/features/channel/services'
import { listChannelAdapter } from '@/features/channel/adapters'

import SelectChannelMenuItem from '@/features/channel/components/SelectChannelItem/Menu'

import { Box, Divider, IconButton, Typography } from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

interface Props {
  onChangeMenu: (menu: OptionsMenuTypes) => void
}

const SwitchAccountOptionsMenu: FC<Props> = ({ onChangeMenu }) => {
  const user = useAppSelector(state => state.auth.user!)
  const [isLoadingSwitchChannel, setIsLoadingSwitchChannel] =
    useState<boolean>(false)

  const { data: channels, isSuccess } = useQuery({
    queryKey: ['ownChannels'],
    queryFn: async () => {
      const channelList = await retrieveOwnChannelsService()
      return listResponseAdapter(channelList, listChannelAdapter)
    }
  })

  const handleDisableMenuItem = (value: boolean) =>
    setIsLoadingSwitchChannel(value)

  return (
    <div data-testid='SwitchAccountOptionsMenu'>
      <Box display='flex' gap={1} alignItems='center' px={1}>
        <IconButton
          role='button'
          size='small'
          data-testid='backButton'
          onClick={() => onChangeMenu('main')}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography>Accounts</Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      <Box px={2} display='flex' flexDirection='column'>
        <Typography variant='caption'>{user.currentChannel.name}</Typography>
        <Typography variant='caption' color='grey'>
          {user.email}
        </Typography>
        <Divider sx={{ mt: 1 }} />
      </Box>

      {isSuccess && channels ? (
        <Box>
          {channels.map(channel => (
            <SelectChannelMenuItem
              disabled={isLoadingSwitchChannel}
              setDisabled={handleDisableMenuItem}
              currentChannelId={user.currentChannel.id}
              key={channel.id}
              {...channel}
            />
          ))}
        </Box>
      ) : null}

      <Divider sx={{ my: 1 }} />
    </div>
  )
}

export default SwitchAccountOptionsMenu
