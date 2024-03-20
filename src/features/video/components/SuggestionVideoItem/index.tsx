import type { FC } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import type { SimpleVideoItemAdapter } from '@/features/video/models'

import ThumbnailImage from '@/components/ui/ThumbnailImage'

import ChannelNameLink from '@/features/channel/components/ChannelNameLink'

import { Box, Typography } from '@mui/material'

import { getTimeAgo } from '@/utils/datetimeFormats'

const SuggestionVideoItem: FC<SimpleVideoItemAdapter> = ({
  id: videoId,
  thumbnailUrl,
  title,
  channel,
  publicationDate,
  views
}) => {
  const navigate = useNavigate()

  const videoUrl = `/watch?v=${videoId}`

  return (
    <Box
      display='flex'
      gap={2}
      onClick={() => navigate(videoUrl)}
      sx={{ cursor: 'pointer' }}
    >
      <Link to={videoUrl} onClick={event => event.stopPropagation()}>
        <ThumbnailImage alt={title} thumbnailUrl={thumbnailUrl} width='168px' />
      </Link>

      <Box width='100%'>
        <Typography
          component='h5'
          variant='subtitle2'
          fontSize='1rem'
          textOverflow='ellipsis'
          lineHeight={1.3}
          whiteSpace='normal'
        >
          {title}
        </Typography>

        <ChannelNameLink
          channelHandle={channel.handle}
          channelName={channel.name}
          fontSize='0.8rem'
        />

        <Typography color='gray' fontSize='0.8rem' lineHeight={1.1}>
          {views} views • {getTimeAgo(publicationDate)}
        </Typography>
      </Box>
    </Box>
  )
}

export default SuggestionVideoItem
