import type { FC } from 'react'

import { useLoaderData } from 'react-router-dom'

import type { ChannelId } from '@/features/channel/types'
import { useFetchChannelDetailsByChannelId } from '@/features/channel/hooks'

import ChannelProfileSection from '@/features/channel/components/ChannelProfileSection'

const ChannelProfileLayoutByChannelId: FC = () => {
  const { channelId } = useLoaderData() as { channelId: ChannelId }

  const { isLoading, isError, error, channelDetails } =
    useFetchChannelDetailsByChannelId(channelId)

  return (
    <ChannelProfileSection
      isError={isError}
      error={error}
      isLoading={isLoading}
      channel={channelDetails}
    />
  )
}

export default ChannelProfileLayoutByChannelId
