import { useState, type FC } from 'react'

import { useFetchOwnPlaylists } from '@/features/playlist/hooks'

import NavbarAsideLink from '@/components/ui/NavbarAsideLink'
import NavbarAsideButton from '@/components/ui/NavbarAsideButton'

import { Stack, Typography } from '@mui/material'

import { red } from '@mui/material/colors'

import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const NavbarAsidePlaylistLinkList: FC = () => {
  const { ownPlaylists, isError, isSuccess } = useFetchOwnPlaylists()

  const [showPlaylists, setShowPlaylists] = useState(false)

  if (isError)
    return (
      <Typography
        component='p'
        variant='subtitle1'
        color={red[500]}
        textAlign='center'
        py={6}
        px={2}
      >
        You are not authenticated
      </Typography>
    )

  if (ownPlaylists?.length === 0) return null

  if (isSuccess && ownPlaylists)
    return (
      <Stack data-testid='NavbarAsidePlaylistLinkList'>
        {showPlaylists ? (
          ownPlaylists.map(playlist => (
            <NavbarAsideLink
              key={playlist.id}
              activeIcon={<PlaylistPlayIcon />}
              href={`/playlist?list=${playlist.id}`}
              title={playlist.name}
            />
          ))
        ) : (
          <NavbarAsideButton
            icon={<KeyboardArrowDownIcon />}
            onClick={() => setShowPlaylists(true)}
            title='Show more'
          />
        )}
      </Stack>
    )
}

export default NavbarAsidePlaylistLinkList
