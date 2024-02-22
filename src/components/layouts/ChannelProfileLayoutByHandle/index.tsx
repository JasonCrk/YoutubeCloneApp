import type { FC } from 'react'

import { useLoaderData } from 'react-router-dom'

import { useFetchChannelDetailsByHandle } from '@/features/channel/hooks'

import ChannelProfileSection from '@/features/channel/components/ChannelProfileSection'

const ChannelLayoutForChannelHandle: FC = () => {
  const { channelHandle } = useLoaderData() as { channelHandle: string }

  const { isLoading, isError, error, channelDetails } =
    useFetchChannelDetailsByHandle(channelHandle)

  return (
    <ChannelProfileSection
      isError={isError}
      error={error}
      isLoading={isLoading}
      channel={channelDetails}
    />
  )
}

export default ChannelLayoutForChannelHandle
