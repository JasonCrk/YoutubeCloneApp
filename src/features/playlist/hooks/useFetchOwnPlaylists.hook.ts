import { useQuery } from '@tanstack/react-query'

import { listResponseAdapter } from '@/adapters'

import { retrieveOwnPlaylistsService } from '@/features/playlist/services'
import { simplePlaylistAdapter } from '@/features/playlist/adapters'

export const useFetchOwnPlaylists = () => {
  const { data: ownPlaylists, ...queryResult } = useQuery({
    queryKey: ['ownPlaylists'],
    queryFn: async () => {
      const playlists = await retrieveOwnPlaylistsService()
      return listResponseAdapter(playlists, simplePlaylistAdapter)
    },
    refetchOnWindowFocus: false
  })

  return { ownPlaylists, ...queryResult }
}
