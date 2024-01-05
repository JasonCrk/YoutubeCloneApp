import { FC, MouseEvent } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { SimpleVideoItemAdapter } from '@/features/video/models'

import Picture from '@/components/ui/Picture'

import { Box, Fade, Tooltip, Typography } from '@mui/material'

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
  const channelUrl = '/@' + channel.handle

  const navigate = useNavigate()

  const handleLinkChannel = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation()
  }

  return (
    <Box data-testid='BlockVideoItem'>
      <Link to={watchVideoUrl} role='link'>
        <img
          src={thumbnailUrl}
          alt={title}
          style={{
            maxWidth: '500px',
            maxHeight: '250px',
            width: '100%',
            height: '100%',
            borderRadius: '15px',
            objectFit: 'cover',
            aspectRatio: 16 / 9
          }}
        />
      </Link>

      <Box
        pt={1}
        gap={1}
        onClick={() => navigate(watchVideoUrl)}
        display={'flex'}
        sx={{ cursor: 'pointer' }}
      >
        <Link
          to={channelUrl}
          onClick={handleLinkChannel}
          style={{ textDecoration: 'none' }}
          role='link'
        >
          <Picture src={channel.pictureUrl} name={channel.name} />
        </Link>

        <Box>
          <Typography
            component={'p'}
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

          <div>
            <Tooltip
              title={channel.name}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 400 }}
              placement='top'
            >
              <Typography
                component={Link}
                to={channelUrl}
                onClick={handleLinkChannel}
                sx={{
                  color: 'gray',
                  fontSize: '0.9rem',
                  '&:hover': { color: 'white' },
                  transition: 'color 0.2s',
                  textDecoration: 'none'
                }}
              >
                {channel.name}
              </Typography>
            </Tooltip>

            <Typography color={'gray'} fontSize={'0.9rem'}>
              {views} views • {getTimeAgo(publicationDate)}
            </Typography>
          </div>
        </Box>
      </Box>
    </Box>
  )
}

export default BlockVideoItem
