import { FC } from 'react'

import { ChannelId, ListChannelAdapter } from '@/features/channel/models'

import Picture from '@/components/ui/Picture'

import { Box, Typography } from '@mui/material'

import CheckIcon from '@mui/icons-material/Check'

interface Props extends ListChannelAdapter {
  currentChannelId: ChannelId
}

const SelectChannelItem: FC<Props> = ({
  id: channelId,
  currentChannelId,
  pictureUrl,
  name,
  handle,
  subscribers
}) => {
  const isActiveChannel = currentChannelId === channelId

  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      data-testid='SelectChannelItem'
      width='100%'
    >
      <Box
        display='flex'
        columnGap={2}
        alignItems='center'
        justifyContent='center'
      >
        <Picture
          src={pictureUrl}
          name={name}
          sx={{
            outlineWidth: isActiveChannel ? '2px' : undefined,
            outlineColor: isActiveChannel ? 'primary.dark' : undefined,
            outlineStyle: isActiveChannel ? 'solid' : undefined
          }}
        />

        <Box>
          <Typography variant='body2'>{name}</Typography>
          <Typography variant='caption' display='block' color='grey'>
            {handle}
          </Typography>
          <Typography variant='caption' display='block' color='grey'>
            {subscribers === 0
              ? 'No subscribers'
              : subscribers + ' subscribers'}
          </Typography>
        </Box>
      </Box>

      {isActiveChannel && <CheckIcon />}
    </Box>
  )
}

export default SelectChannelItem
