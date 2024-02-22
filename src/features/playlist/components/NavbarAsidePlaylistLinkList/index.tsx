import type { FC } from 'react'

import { useFetchOwnPlaylists } from '@/features/playlist/hooks'

import NavbarAsideLink from '@/components/ui/NavbarAsideLink'

import { Box, Stack } from '@mui/material'

import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'

const NavbarAsidePlaylistLinkList: FC = () => {
  const { ownPlaylists, isLoading, isError, isSuccess } = useFetchOwnPlaylists()

  if (isLoading) return null

  if (isError)
    return (
      <Box textAlign='center' width='100%' py={4} px={2}>
        You are not authenticated
      </Box>
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
