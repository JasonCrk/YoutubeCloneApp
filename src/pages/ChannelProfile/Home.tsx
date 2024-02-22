import type { FC } from 'react'

import { useOutletContext } from 'react-router-dom'

import type { ChannelId } from '@/features/channel/types'
import { useFetchChannelVideos } from '@/features/channel/hooks'

import BlockVideoItem from '@/features/video/components/BlockVideoItem'
import BlockVideoItemSkeleton from '@/features/video/components/BlockVideoItemSkeleton'

import { Box, Grid, Typography } from '@mui/material'

const ChannelProfileHomePage: FC = () => {
  const { channelId, channelIsLoading } = useOutletContext<{
    channelId: ChannelId
    channelIsLoading: boolean
  }>()

  const { channelVideos, isLoading, isError, isSuccess, error } =
    useFetchChannelVideos(channelId)

  if (isLoading || channelIsLoading)
    return (
      <Grid container rowSpacing={4} columnSpacing={2}>
        {[...Array(8)].map(() => (
          <Grid item key={crypto.randomUUID()} xs={12} sm={6} md={3} lg={3}>
            <BlockVideoItemSkeleton />
          </Grid>
        ))}
      </Grid>
    )

  if (isError) return <Box>{error.message}</Box>

  if (channelVideos?.length === 0)
    return (
      <Box
        py={8}
        gap={1}
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
      >
        <img width={'200px'} src='/no_videos.svg' alt='No Videos' />
        <Typography variant='body1' fontWeight='bold'>
          Create content on any device
        </Typography>
        <Typography
          variant='body2'
          sx={{ textWrap: 'balance', textAlign: 'center' }}
          width='300px'
        >
          Upload and record at home or on the go. Everything you make public
          will appear here.
        </Typography>
      </Box>
    )

  if (channelVideos && isSuccess)
    return (
      <Grid container rowSpacing={4} columnSpacing={2}>
        {channelVideos &&
          channelVideos.map(video => (
            <Grid item key={video.id} xs={12} sm={6} md={3} lg={3}>
              <BlockVideoItem {...video} />
            </Grid>
          ))}
      </Grid>
    )
}

export default ChannelProfileHomePage
