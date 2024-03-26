import { useQuery } from '@tanstack/react-query'

import { listResponseAdapter } from '@/adapters'

import { retrieveOwnPlaylistsService } from '@/features/playlist/services'
import { simplePlaylistListAdapter } from '@/features/playlist/adapters'

export const useFetchOwnPlaylists = () => {
  const { data: ownPlaylists, ...queryResult } = useQuery({
    queryKey: ['ownPlaylists'],
    queryFn: async () => {
      const playlists = await retrieveOwnPlaylistsService()
      return listResponseAdapter(playlists, simplePlaylistListAdapter)
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })

  return { ownPlaylists, ...queryResult }
}
