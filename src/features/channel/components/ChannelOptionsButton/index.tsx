import { FC, MouseEvent, useState } from 'react'

import { useAppSelector } from '@/store/hooks'

import Picture from '@/components/ui/Picture'

import ChannelOptionsMenu from '@/features/channel/components/ChannelOptionsMenu'

const ChannelPictureOptionsButton: FC = () => {
  const user = useAppSelector(state => state.auth.user)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleCloseMenu = () => setAnchorEl(null)

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget)

  if (!user) return null

  return (
    <div data-testid='ChannelOptions'>
      <Picture
        name={user.currentChannel.name}
        src={user.currentChannel.pictureUrl}
        onClick={handleOpenMenu}
        sx={{
          width: '32px',
          height: '32px',
          aspectRatio: 1 / 1,
          cursor: 'pointer',
          ':active': {
            borderWidth: '2px',
            borderColor: 'primary.main',
            borderStyle: 'solid'
          }
        }}
      />

      <ChannelOptionsMenu
        anchorEl={anchorEl}
        channel={user.currentChannel}
        onClose={handleCloseMenu}
      />
    </div>
  )
}

export default ChannelPictureOptionsButton
