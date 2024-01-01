import { FC } from 'react'

import { useService } from '@/hooks/useService.hook'
import { listResponseAdapter } from '@/adapters/listResponse.adapter'

import { retrieveOwnPlaylistsService } from '@/features/playlist/services'
import { simplePlaylistAdapter } from '@/features/playlist/adapters'

import NavbarAsideLink from '@/components/ui/NavbarAsideLink'

import { Stack } from '@mui/material'

import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'

const NavbarAsidePlaylistLinkList: FC = () => {
  const {
    data: playlists,
    isLoading,
    isSuccess
  } = useService({
    serviceFn: async () => {
      const data = await retrieveOwnPlaylistsService()
      return listResponseAdapter(data, simplePlaylistAdapter)
    }
  })

  if (isLoading) return null

  return (
    <Stack data-testid='NavbarAsidePlaylistLinkList'>
      {isSuccess &&
        playlists &&
        playlists.map(playlist => (
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
