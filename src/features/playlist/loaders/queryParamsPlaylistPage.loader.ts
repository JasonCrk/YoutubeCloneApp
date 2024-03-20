import { LoaderFunction, redirect } from 'react-router-dom'

import { QueryClient } from '@tanstack/react-query'

import { retrievePlaylistDetailsService } from '@/features/playlist/services'
import { playlistDetailsAdapter } from '@/features/playlist/adapters'

export const queryParamsPlaylistPage = (
  queryClient: QueryClient
): LoaderFunction => {
  return ({ request }) => {
    const queryParams = new URL(request.url).searchParams

    if (queryParams.size === 0) return redirect('/')

    const playlistId = Number(queryParams.get('list'))

    if (playlistId === null || playlistId <= 0) return redirect('/')

    queryClient.prefetchQuery({
      queryKey: ['playlistDetails', playlistId],
      queryFn: async () => {
        const playlist = await retrievePlaylistDetailsService(playlistId)
        return playlistDetailsAdapter(playlist)
      }
    })

    return { playlistId }
  }
}
