import type { FC, MouseEvent } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import type { SimpleVideoItemAdapter } from '@/features/video/models'

import Picture from '@/components/ui/Picture'
import ThumbnailImage from '@/components/ui/ThumbnailImage'

import ChannelNameLink from '@/features/channel/components/ChannelNameLink'

import { Box, Typography } from '@mui/material'

import { getTimeAgo } from '@/utils/datetimeFormats'

const BlockVideoItem: FC<SimpleVideoItemAdapter> = ({
  id: videoId,
  thumbnailUrl,
  title,
  channel,
  publicationDate,
  views
}) => {
  const watchVideoUrl = '/watch?v=' + videoId
  const channelUrl = '/' + channel.handle

  const navigate = useNavigate()

  const handleLinkChannel = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation()
  }

  return (
    <Box data-testid='BlockVideoItem'>
      <Link to={watchVideoUrl} role='link'>
        <ThumbnailImage thumbnailUrl={thumbnailUrl} alt={title} />
      </Link>

      <Box
        pt={1}
        gap={1}
        onClick={() => navigate(watchVideoUrl)}
        display='flex'
        sx={{ cursor: 'pointer' }}
      >
        <Link
          to={channelUrl}
          onClick={handleLinkChannel}
          style={{ textDecoration: 'none' }}
          role='link'
        >
          <Picture
            src={channel.pictureUrl}
            name={channel.name}
            sx={{ width: '36px' }}
          />
        </Link>

        <Box>
          <Typography
            component='p'
            title={title}
            sx={{
              color: 'white',
              fontSize: '1.1rem',
              maxHeight: '3.1em',
              overflow: 'hidden',
              display: '-webkit-block',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 2,
              whiteSpace: 'normal'
            }}
          >
            {title}
          </Typography>

          <ChannelNameLink
            channelName={channel.name}
            channelHandle={channel.handle}
          />

          <Typography color='gray' fontSize='0.9rem'>
            {views} views • {getTimeAgo(publicationDate)}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default BlockVideoItem
