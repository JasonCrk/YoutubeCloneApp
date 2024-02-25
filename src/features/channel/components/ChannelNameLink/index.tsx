import type { FC } from 'react'

import { Link } from 'react-router-dom'

import type { ChannelHandle, ChannelName } from '@/features/channel/types'

import { Fade, Tooltip, Typography } from '@mui/material'

interface Props {
  channelName: ChannelName
  channelHandle: ChannelHandle
  fontSize?: string | number
}

const ChannelNameLink: FC<Props> = ({
  channelName,
  channelHandle,
  fontSize
}) => {
  return (
    <Tooltip
      title={channelName}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 400 }}
      placement='top'
    >
      <Typography
        component={Link}
        to={`/${channelHandle}`}
        onClick={event => event.stopPropagation()}
        sx={{
          color: 'gray',
          fontSize: fontSize ?? '0.9rem',
          '&:hover': { color: 'white' },
          transition: 'color 0.2s',
          textDecoration: 'none'
        }}
      >
        {channelName}
      </Typography>
    </Tooltip>
  )
}

export default ChannelNameLink
