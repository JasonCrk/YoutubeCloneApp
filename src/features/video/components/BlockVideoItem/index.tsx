import { type FC, type MouseEvent, useMemo } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { useAppSelector } from '@/store/hooks'

import type { SimpleVideoItemAdapter } from '@/features/video/models'

import Picture from '@/components/ui/Picture'
import ThumbnailImage from '@/components/ui/ThumbnailImage'

import ChannelNameLink from '@/features/channel/components/ChannelNameLink'
import VideoOptionsMenuButton from '@/features/video/components/VideoOptionsMenuButton'

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
  const isAuth = useAppSelector(state => state.auth.isAuth)

  const watchVideoUrl = '/watch?v=' + videoId
  const channelUrl = '/' + channel.handle

  const navigate = useNavigate()

  const timeAgoPublicationDate = useMemo(() => {
    return getTimeAgo(publicationDate)
  }, [publicationDate])

  const handleLinkChannel = (event: MouseEvent<HTMLAnchorElement>) =>
    event.stopPropagation()

  return (
    <Box
      data-testid='BlockVideoItem'
      display='flex'
      flexDirection='column'
      sx={{
        '&:hover .videoOptionsMenuButton': {
          visibility: 'visible'
        },
        '&:not(:hover) .videoOptionsMenuButton': {
          visibility: 'hidden'
        }
      }}
    >
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

        <Box position='relative' flexGrow={1}>
          {isAuth && (
            <Box
              className='videoOptionsMenuButton'
              position='absolute'
              visibility='hidden'
              right={0}
              top={0}
              onClick={event => event.stopPropagation()}
            >
              <VideoOptionsMenuButton videoId={videoId} />
            </Box>
          )}

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
            {views} views • {timeAgoPublicationDate}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default BlockVideoItem
