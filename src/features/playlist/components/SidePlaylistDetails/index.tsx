import { useState, type FC } from 'react'

import { Link } from 'react-router-dom'

import { useAppSelector } from '@/store/hooks'

import type { PlaylistDetailsAdapter } from '@/features/playlist/models'

import ThumbnailImage from '@/components/ui/ThumbnailImage'
import EditIconButton from '@/components/ui/EditIconButton'

import UpdatePlaylistNameField from '@/features/playlist/components/UpdatePlaylistNameField'
import UpdatePlaylistDescriptionField from '@/features/playlist/components/UpdatePlaylistDescriptionField'
import UpdatePlaylistVisibilityField from '@/features/playlist/components/UpdatePlaylistVisibilityField'
import PlayAllPlaylistVideosButton from '@/features/playlist/components/PlayAllPlaylistVideosButton'

import {
  Box,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'

import PlayArrowIcon from '@mui/icons-material/PlayArrow'

import { dateFormat } from '@/utils/datetimeFormats'
import PlaylistOptionsMenuButton from '@/features/playlist/components/PlaylistOptionsMenuButton'

const SidePlaylistDetails: FC<PlaylistDetailsAdapter> = ({
  id: playlistId,
  name,
  firstVideoId,
  thumbnail,
  channel,
  totalVideos,
  updatedAt,
  description,
  visibility
}) => {
  const { isAuth, user } = useAppSelector(state => state.auth)

  const [isEditingPlaylistName, setIsEditingPlaylistName] = useState(false)
  const [isEditingPlaylistDescription, setIsEditingPlaylistDescription] =
    useState(false)

  const theme = useTheme()
  const isMdBreakpointUp = useMediaQuery(theme.breakpoints.up('md'))

  const handleEditingPlaylistName = () => {
    setIsEditingPlaylistName(true)
  }

  const handleEditingPlaylistDescription = () => {
    setIsEditingPlaylistDescription(true)
  }

  const isOwnPlaylist = user?.currentChannel.id === channel.id && isAuth

  return (
    <Box
      p={3}
      gap={2}
      component='section'
      borderRadius={{ base: 0, md: '15px 15px 0 0' }}
      overflow='hidden'
      flexDirection='column'
      display='flex'
      color='white'
      mb={{ xs: 0, md: 2 }}
      sx={{
        background: `linear-gradient(${theme.palette.grey[800]}, transparent)`
      }}
    >
      <Box
        gap={2}
        display='flex'
        flexGrow={1}
        flexDirection={{ base: 'row', md: 'column', sm: 'row', xs: 'column' }}
        justifyContent={{
          md: 'start',
          base: 'space-around'
        }}
      >
        {firstVideoId && thumbnail && (
          <Box
            to={`/watch?v=${firstVideoId}&list=${playlistId}`}
            component={Link}
            display='flex'
            position='relative'
            sx={{ '&:hover .playAll': { opacity: 1 } }}
            alignSelf={{ xs: 'center', base: 'auto' }}
          >
            <ThumbnailImage
              alt={name}
              thumbnailUrl={thumbnail}
              maxWidth='350px'
            />

            <Box
              position='absolute'
              className='playAll'
              bgcolor='rgba(0, 0, 0, 0.85)'
              sx={{
                borderRadius: '15px',
                opacity: 0,
                width: '100%',
                height: '100%',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 200ms ease-out'
              }}
            >
              <PlayArrowIcon />

              <Typography
                component='span'
                variant='caption'
                fontWeight='bold'
                textTransform='uppercase'
              >
                Play all
              </Typography>
            </Box>
          </Box>
        )}

        <Box flexGrow={{ xs: 1, md: 0 }}>
          {isEditingPlaylistName ? (
            <UpdatePlaylistNameField
              defaultValue={name}
              playlistId={playlistId}
              setOpenForm={setIsEditingPlaylistName}
            />
          ) : (
            <Box position='relative'>
              <Typography variant='h5' fontWeight='bold'>
                {name}
              </Typography>

              {isOwnPlaylist && (
                <EditIconButton
                  tooltipProps={{ title: 'Edit playlist title' }}
                  onClick={handleEditingPlaylistName}
                />
              )}
            </Box>
          )}

          <Box
            my={1.6}
            display='flex'
            flexDirection='column'
            position={{ xs: 'relative', md: 'static' }}
            gap={1}
            alignItems='start'
          >
            <Tooltip title={channel.name} placement='top'>
              <Typography
                component={Link}
                color='white'
                variant='body2'
                width='fit-content'
                fontWeight='bold'
                to={`/${channel.handle}`}
                sx={{ textDecoration: 'none' }}
              >
                {channel.name}
              </Typography>
            </Tooltip>

            {isOwnPlaylist && (
              <UpdatePlaylistVisibilityField
                playlistId={playlistId}
                defaultValue={visibility}
              />
            )}

            <Typography fontSize='0.8rem' color={theme.palette.grey[400]}>
              {totalVideos} videos Last updated on {dateFormat(updatedAt)}
            </Typography>

            {isOwnPlaylist && (
              <Box
                position={{ xs: 'absolute', md: 'static' }}
                sx={{
                  top: { xs: '50%', md: 0 },
                  right: 0,
                  transform: { xs: 'translateY(-50%)', sm: 'translateY(0%)' }
                }}
              >
                <PlaylistOptionsMenuButton
                  playlist={{ channelId: channel.id, id: playlistId }}
                />
              </Box>
            )}
          </Box>

          {isMdBreakpointUp && firstVideoId && (
            <PlayAllPlaylistVideosButton
              playlistId={playlistId}
              firstVideoId={firstVideoId}
            />
          )}

          {isEditingPlaylistDescription ? (
            <UpdatePlaylistDescriptionField
              defaultValue={description}
              playlistId={playlistId}
              setOpenForm={setIsEditingPlaylistDescription}
            />
          ) : (
            <Box position='relative' mt={1}>
              <Typography component='p' variant='body2'>
                {description ? description : 'No description'}
              </Typography>

              {isOwnPlaylist && (
                <EditIconButton
                  tooltipProps={{ title: 'Edit playlist description' }}
                  onClick={handleEditingPlaylistDescription}
                />
              )}
            </Box>
          )}
        </Box>
      </Box>

      {!isMdBreakpointUp && firstVideoId && (
        <PlayAllPlaylistVideosButton
          playlistId={playlistId}
          firstVideoId={firstVideoId}
        />
      )}
    </Box>
  )
}

export default SidePlaylistDetails
