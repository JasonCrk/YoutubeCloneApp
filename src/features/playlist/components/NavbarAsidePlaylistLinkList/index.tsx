import type { FC } from 'react'

import { useFetchOwnPlaylists } from '@/features/playlist/hooks'

import NavbarAsideLink from '@/components/ui/NavbarAsideLink'

import { Stack, Typography } from '@mui/material'

import { red } from '@mui/material/colors'

import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'

const NavbarAsidePlaylistLinkList: FC = () => {
  const { ownPlaylists, isLoading, isError, isSuccess } = useFetchOwnPlaylists()

  if (isLoading) return null

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

  if (isSuccess && ownPlaylists)
    return (
      <Stack data-testid='NavbarAsidePlaylistLinkList'>
        {ownPlaylists.map(playlist => (
          <NavbarAsideLink
            key={playlist.id}
            activeIcon={<PlaylistPlayIcon />}
            href={`/playlist?list=${playlist.id}`}
            title={playlist.name}
          />
        ))}
      </Stack>
    )
}

export default NavbarAsidePlaylistLinkList
