import type { FC } from 'react'

import { useOutletContext } from 'react-router-dom'

import type { ChannelId } from '@/features/channel/types'
import { useFetchChannelPlaylists } from '@/features/playlist/hooks'

import BlockPlaylistItem from '@/features/playlist/components/BlockPlaylistItem'
import BlockPlaylistItemSkeleton from '@/features/playlist/components/BlockPlaylistItemSkeleton'

import { Box, Grid } from '@mui/material'

const ChannelProfilePlaylistsPage: FC = () => {
  const { channelId, channelIsLoading } = useOutletContext<{
    channelId: ChannelId
    channelIsLoading: boolean
  }>()

  const { channelPlaylists, isLoading, isSuccess, isError, error } =
    useFetchChannelPlaylists(channelId)

  if (isLoading && channelIsLoading)
    return (
      <Grid container rowSpacing={4} columnSpacing={2}>
        {[...Array(8)].map(() => (
          <Grid item key={crypto.randomUUID()} xs={12} sm={6} md={3} lg={3}>
            <BlockPlaylistItemSkeleton />
          </Grid>
        ))}
      </Grid>
    )

  if (isError) return <Box>{error.message}</Box>

  if (channelPlaylists?.length === 0)
    return (
      <Box py={4} display='flex' justifyContent='center'>
        No playlists created or saved
      </Box>
    )

  if (channelPlaylists && isSuccess)
    return (
      <Grid container rowSpacing={4} columnSpacing={2}>
        {channelPlaylists.map(playlist => (
          <Grid item key={playlist.id} xs={12} sm={6} md={3} lg={3}>
            <BlockPlaylistItem {...playlist} />
          </Grid>
        ))}
      </Grid>
    )
}

export default ChannelProfilePlaylistsPage
