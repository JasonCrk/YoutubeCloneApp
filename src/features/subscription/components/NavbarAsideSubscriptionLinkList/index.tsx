import type { FC } from 'react'

import { useFetchSubscribedChannels } from '@/features/subscription/hooks'

import NavbarAsideSubscriptionLink from '@/features/subscription/components/NavbarAsideSubscriptionLink'

import { Stack, Typography } from '@mui/material'

import { red } from '@mui/material/colors'

const NavbarAsideSubscriptionLinkList: FC = () => {
  const { subscribedChannels, isLoading, isSuccess, isError } =
    useFetchSubscribedChannels()

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

  if (isSuccess && subscribedChannels)
    return (
      <Stack data-testid='NavbarAsideSubscriptionLinkList'>
        {subscribedChannels.map(channel => (
          <NavbarAsideSubscriptionLink key={channel.id} {...channel} />
        ))}
      </Stack>
    )
}

export default NavbarAsideSubscriptionLinkList
