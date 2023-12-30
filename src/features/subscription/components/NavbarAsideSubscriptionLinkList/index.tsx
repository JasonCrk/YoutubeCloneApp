import { FC } from 'react'

import { useService } from '@/hooks/useService.hook'
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
  } = useService({
    serviceFn: async () => {
      const serviceResponse = await retrieveSubscribedChannelsService()
      return listResponseAdapter(serviceResponse, simpleChannelAdapter)
    }
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
