import { useMemo, type FC } from 'react'

import { Link } from 'react-router-dom'

import type { PlaylistVideoItemAdapter } from '@/features/playlist/models'
import type { PlaylistId } from '@/features/playlist/types'

import ThumbnailImage from '@/components/ui/ThumbnailImage'

import { Box, Typography, Tooltip } from '@mui/material'

import grey from '@mui/material/colors/grey'

import { getTimeAgo } from '@/utils/datetimeFormats'

interface Props extends PlaylistVideoItemAdapter {
  playlistId: PlaylistId
}

const PlaylistVideoContent: FC<Props> = ({ position, video, playlistId }) => {
  const watchPlaylistVideoUrl = `/watch?v=${
    video.id
  }&list=${playlistId}&index=${position + 1}`

  const timeAgoPublicationDate = useMemo(
    () => getTimeAgo(video.publicationDate),
    [video.publicationDate]
  )

  return (
    <Box
      py={1}
      pr={1}
      gap={1}
      width='100%'
      display='flex'
      component={Link}
      to={watchPlaylistVideoUrl}
      sx={{ textDecoration: 'none', color: 'white' }}
    >
      <ThumbnailImage
        alt={video.title}
        thumbnailUrl={video.thumbnailUrl}
        width='160px'
      />

      <Box flexGrow={1}>
        <Typography component='h6' fontSize='1rem' title={video.title} mb={0.8}>
          {video.title}
        </Typography>

        <Typography component='p' color={grey[500]} fontSize='0.75rem'>
          <Tooltip title={video.channel.name} placement='top'>
            <Typography
              component='span'
              fontSize='0.75rem'
              sx={{ '&:hover': { color: 'white' } }}
            >
              {video.channel.name}
            </Typography>
          </Tooltip>
          {' • '}
          <Typography component='span' fontSize='0.75rem'>
            {video.views} views • {timeAgoPublicationDate}
          </Typography>
        </Typography>
      </Box>
    </Box>
  )
}

export default PlaylistVideoContent
