import type { FC } from 'react'

import { Outlet } from 'react-router-dom'

import { useQueryClient } from '@tanstack/react-query'

import { MessageResponse } from '@/models/responses'

import { useAppSelector } from '@/store/hooks'

import type { ChannelDetailsAdapter } from '@/features/channel/models'

import SubscribeButton from '@/features/subscription/components/SubscribeButton'
import ChannelProfilePicture from '@/features/channel/components/ChannelProfilePicture'
import ChannelProfileTabsNavigation from '@/features/channel/components/ChannelProfileTabsNavigation'

import { Box, Container, Stack, Tooltip, Typography } from '@mui/material'

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

interface Props {
  channel: ChannelDetailsAdapter | undefined
  isLoading: boolean
  isError: boolean
  error: MessageResponse | null
}

const ChannelProfileSection: FC<Props> = ({
  channel,
  isLoading,
  isError,
  error
}) => {
  const user = useAppSelector(state => state.auth.user)

  const queryClient = useQueryClient()

  const handleSuccessfulSubscription = () => {
    queryClient.invalidateQueries({ queryKey: ['channelProfile'] })
  }

  if (isLoading)
    return (
      <Box pt='56px'>
        <Box>is loading...</Box>
        <Outlet context={{ channelId: undefined, isLoadingChannel: true }} />
      </Box>
    )

  if (isError) return <Box pt='56px'>{error?.message}</Box>

  if (channel)
    return (
      <Box pt='56px' width='100%' color='white'>
        <Box
          position='sticky'
          top='56px'
          bgcolor='background.default'
          width='100%'
          borderBottom={1}
          borderColor='divider'
          zIndex={10}
        >
          <Container
            maxWidth='lg'
            component='section'
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {channel.bannerUrl && (
              <img
                src={channel.bannerUrl}
                alt={channel.name + ' banner'}
                width='100%'
                height='172px'
                style={{ borderRadius: '15px' }}
              />
            )}

            <Box display='flex' gap={3} my={2}>
              <ChannelProfilePicture
                id={channel.id}
                name={channel.name}
                pictureUrl={channel.pictureUrl}
              />

              <Stack spacing={0.5} alignItems='start'>
                <Tooltip title={channel.name} placement='top'>
                  <Typography component='h2' variant='h4' fontWeight='bold'>
                    {channel.name}
                  </Typography>
                </Tooltip>

                <Typography component='p' variant='body2' color='grey'>
                  {channel.handle} •{' '}
                  {channel.totalSubscribers > 0
                    ? channel.totalSubscribers
                    : 'No'}{' '}
                  subscribers • {channel.totalVideos} videos
                </Typography>

                <Typography
                  variant='body2'
                  color='grey'
                  display='flex'
                  gap={0.5}
                  alignItems='center'
                >
                  <span>More about this channel</span>
                  <KeyboardArrowRightIcon />
                </Typography>

                {user?.currentChannel.id !== channel.id && (
                  <SubscribeButton
                    channelId={channel.id}
                    subscribed={channel.isSubscribed}
                    onSuccessfulSubscription={handleSuccessfulSubscription}
                  />
                )}
              </Stack>
            </Box>

            <ChannelProfileTabsNavigation
              channelId={channel.id}
              channelHandle={channel.handle}
            />
          </Container>
        </Box>

        <Container maxWidth='lg' sx={{ my: 2 }}>
          <Outlet
            context={{ channelId: channel.id, channelIsLoading: false }}
          />
        </Container>
      </Box>
    )
}

export default ChannelProfileSection
