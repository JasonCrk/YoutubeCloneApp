import { useState, type FC } from 'react'

import { useAppSelector } from '@/store/hooks'

import type { OptionsMenuTypes } from '@/features/channel/types'
import { useFetchOwnChannels } from '@/features/channel/hooks'

import SelectChannelMenuItem from '@/features/channel/components/SelectChannelItem/Menu'
import CreateChannelMenuOption from '@/features/channel/components/CreateChannelMenuOption'

import { Box, Divider, IconButton, Typography } from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

interface Props {
  onChangeMenu: (menu: OptionsMenuTypes) => void
}

const SwitchAccountOptionsMenu: FC<Props> = ({ onChangeMenu }) => {
  const [isLoadingSwitchChannel, setIsLoadingSwitchChannel] =
    useState<boolean>(false)

  const user = useAppSelector(state => state.auth.user)

  const { channels, isSuccess } = useFetchOwnChannels()

  const handleDisableMenuItem = (value: boolean) =>
    setIsLoadingSwitchChannel(value)

  if (!user) return null

  return (
    <div data-testid='SwitchAccountOptionsMenu'>
      <Box display='flex' gap={1} alignItems='center' px={1}>
        <IconButton
          role='button'
          data-testid='backButton'
          size='small'
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

      <CreateChannelMenuOption />
    </div>
  )
}

export default SwitchAccountOptionsMenu
