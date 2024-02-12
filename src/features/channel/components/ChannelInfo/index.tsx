import type { FC } from 'react'

import { Link } from 'react-router-dom'

import type { ListChannelAdapter } from '@/features/channel/models'

import Picture from '@/components/ui/Picture'

import { Box, Tooltip, Typography } from '@mui/material'

interface Props {
  channel: ListChannelAdapter
}

const ChannelInfo: FC<Props> = ({ channel }) => {
  const channelProfileUrl = '/' + channel.handle

  return (
    <Box data-testid='ChannelInfo' display='flex' gap={1} alignItems='center'>
      <Link
        role='link'
        data-testid='pictureLinkToChannelProfile'
        to={channelProfileUrl}
        style={{ textDecoration: 'none' }}
      >
        <Picture name={channel.name} src={channel.pictureUrl} />
      </Link>

      <Box>
        <Tooltip title={channel.name} placement='top'>
          <Typography
            component={Link}
            to={channelProfileUrl}
            variant='subtitle1'
            lineHeight='20px'
            fontWeight='500'
            sx={{ textDecoration: 'none', color: 'white' }}
          >
            {channel.name}
          </Typography>
        </Tooltip>

        <Typography component='p' variant='caption' color='grey'>
          {channel.subscribers === 0
            ? 'No subscribers'
            : `${channel.subscribers} subscribers`}
        </Typography>
      </Box>
    </Box>
  )
}

export default ChannelInfo
