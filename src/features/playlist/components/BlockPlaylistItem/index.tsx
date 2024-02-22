import type { FC } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import type { PlaylistItemAdapter } from '@/features/playlist/models'

import ThumbnailImage from '@/components/ui/ThumbnailImage'
import VisibilityTag from '@/components/ui/VisibilityTag'

import { Box, Typography } from '@mui/material'

import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

const BlockPlaylistItem: FC<PlaylistItemAdapter> = ({
  id: playlistId,
  firstVideoId,
  name,
  thumbnailUrl,
  totalVideos,
  visibility
}) => {
  const navigate = useNavigate()

  const playPlaylistUrl = `/watch?v=${firstVideoId}&list=${playlistId}`

  return (
    <Box
      sx={{
        '&:hover .playAllHover': {
          display: 'flex'
        }
      }}
    >
      <Link
        to={playPlaylistUrl}
        style={{ textDecoration: 'none', color: 'white' }}
      >
        <Box
          position='relative'
          display='flex'
          borderRadius='15px'
          overflow='hidden'
        >
          <Box
            className='playAllHover'
            display='none'
            position='absolute'
            width='100%'
            height='100%'
            bgcolor='rgba(0, 0, 0, 0.8)'
            alignItems='center'
            zIndex={2}
            gap={0.5}
            justifyContent='center'
          >
            <PlayArrowIcon />
            <Typography
              variant='body2'
              fontWeight='bold'
              textTransform='uppercase'
            >
              Play all
            </Typography>
          </Box>

          <ThumbnailImage
            alt={`${firstVideoId} video thumbnail`}
            thumbnailUrl={thumbnailUrl}
          />

          <Box
            position='absolute'
            bottom='12px'
            right='8px'
            py={0.5}
            px={1}
            borderRadius='5px'
            bgcolor='rgba(34,34,34,0.5)'
            display='flex'
            gap={0.5}
            fontSize='0.8rem'
            alignItems='center'
          >
            <PlaylistPlayIcon fontSize='small' />
            <span>{totalVideos} videos</span>
          </Box>
        </Box>

        <Typography pt={0.5} fontSize='0.9rem' fontWeight='bold'>
          {name}
        </Typography>
      </Link>

      <Box
        pt={1.2}
        sx={{ cursor: 'pointer' }}
        onClick={() => navigate(playPlaylistUrl)}
      >
        <VisibilityTag visibility={visibility} />

        <Typography
          component={Link}
          to={`/playlist?list=${playlistId}`}
          onClick={event => event.stopPropagation()}
          sx={{
            mt: 1.2,
            fontSize: '0.85rem',
            textDecoration: 'none',
            color: 'grey',
            ':hover': {
              color: 'white'
            }
          }}
        >
          View full playlist
        </Typography>
      </Box>
    </Box>
  )
}

export default BlockPlaylistItem
