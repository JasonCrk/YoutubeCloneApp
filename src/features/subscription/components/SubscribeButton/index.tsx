import type { FC } from 'react'

import { useAppSelector } from '@/store/hooks'

import type { ChannelId } from '@/features/channel/types'
import { useAuthModalContext } from '@/features/auth/hooks'
import { useSubscribeToChannel } from '@/features/subscription/hooks'

import { UiSubscribeButton } from '@/features/subscription/components/SubscribeButton/ui'

interface Props {
  channelId: ChannelId
  subscribed: boolean
  onSuccessfulSubscription?: () => void
  onFailedSubscription?: () => void
}

const SubscribeButton: FC<Props> = ({
  channelId,
  subscribed,
  onFailedSubscription,
  onSuccessfulSubscription
}) => {
  const { isAuth, user } = useAppSelector(state => state.auth)

  const { mutateSubscribeToChannel } = useSubscribeToChannel()

  const { onOpen: openAuthModal } = useAuthModalContext()

  if (isAuth && user?.currentChannel.id === channelId) return null

  const handleSubscribeChannel = () => {
    if (!isAuth) {
      openAuthModal()
      return
    }

    if (user?.currentChannel.id === channelId) return

    mutateSubscribeToChannel(channelId, {
      onError: onFailedSubscription,
      onSuccess: onSuccessfulSubscription
    })
  }

  return (
    <UiSubscribeButton
      data-testid='SubscribeButton'
      isSubscribed={subscribed}
      onClick={handleSubscribeChannel}
    >
      {subscribed ? 'Subscribed' : 'Subscribe'}
    </UiSubscribeButton>
  )
}

export default SubscribeButton
