import { FC } from 'react'

import { useQuery } from '@tanstack/react-query'

import { listResponseAdapter } from '@/adapters/index'

import { retrieveSubscribedChannelsService } from '@/features/subscription/services'

import { simpleChannelAdapter } from '@/features/channel/adapters'
import NavbarAsideSubscriptionLink from '@/features/subscription/components/NavbarAsideSubscriptionLink'

import { Stack } from '@mui/material'

const NavbarAsideSubscriptionLinkList: FC = () => {
  const {
    data: subscribedChannels,
    isLoading,
    isSuccess
  } = useQuery({
    queryKey: ['subscribedChannels'],
    queryFn: async () => {
      const unadaptedSubscribedChannels =
        await retrieveSubscribedChannelsService()
      return listResponseAdapter(
        unadaptedSubscribedChannels,
        simpleChannelAdapter
      )
    },
    refetchOnWindowFocus: false
  })

  if (isLoading) return null

  return (
    <Stack data-testid='NavbarAsideSubscriptionLinkList'>
      {isSuccess &&
        subscribedChannels &&
        subscribedChannels.map(channel => (
          <NavbarAsideSubscriptionLink key={channel.id} {...channel} />
        ))}
    </Stack>
  )
}

export default NavbarAsideSubscriptionLinkList
